import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../utils/api";
import { useWorkspace } from "../../hooks/useWorkspace";
import "./Members.css";
function Members() {
  const { activeWorkspace, loading: workspaceLoading } = useWorkspace();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [adding, setAdding] = useState(false);

  const [currentUserId, setCurrentUserId] = useState("");

  const currentMember = members.find(
    (member) => member.userId?._id === currentUserId,
  );
  const canAddMembers =
    currentMember?.role === "owner" || currentMember?.role === "admin";

  useEffect(() => {
    if (activeWorkspace) {
      loadMembers();
    }
  }, [activeWorkspace]);

  const loadMembers = async () => {
    if (!activeWorkspace) return;
    setLoading(true);

    try {
      const response = await fetchWithAuth(
        `/workspaces/${activeWorkspace._id}`,
      );
      const data = await response.json();

      const meResponse = await fetchWithAuth("/auth/me");
      const meData = await meResponse.json();

      if (meResponse.ok) {
        setCurrentUserId(meData.user.id);
      }

      if (response.ok) {
        setMembers(data.workspace.members || []);
      } else {
        setError(data.message || "Failed to load members");
      }
    } catch (err) {
      setError("Failed to load members: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setError("");

    if (!canAddMembers) {
      setError("You don't have permission to add members");
      return;
    }
    try {
      const userResponse = await fetchWithAuth(
        `/auth/users/search?email=${email}`,
      );
      const userData = await userResponse.json();
      if (!userResponse.ok) {
        setError("User not found");
        setAdding(false);
        return;
      }

      const response = await fetchWithAuth(
        `/workspaces/${activeWorkspace._id}/members`,
        {
          method: "POST",
          body: JSON.stringify({ userId: userData.user._id, role }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setEmail("");
        setRole("member");
        setShowAddForm(false);
        loadMembers();
      } else {
        setError(data.message || "Failed to add member");
      }
    } catch (err) {
      setError("Failed to add member: " + err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Remmove this member?")) return;
    try {
      const response = await fetchWithAuth(
        `/workspaces/${activeWorkspace._id}/members/${userId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        loadMembers();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete member");
      }
    } catch (err) {
      setError("Failed to delete member: " + err.message);
    }
  };

  if (workspaceLoading) {
    return <div>Loading workspace...</div>;
  }

  if (!activeWorkspace) {
    return <div>No workspace selected</div>;
  }

  return (
    <div>
      <div className="add-member-topic">
        <h1>Members table - {activeWorkspace.name}</h1>
        <p>Manage members in this workspace</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="add-member">
          {canAddMembers && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="add-member-button"
            >
              Add member
            </button>
          )}
          {showAddForm && (
            <form onSubmit={handleAddMember}>
              <div className="adding-group">
                <div className="input-group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-add"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={adding}
                  />
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                >
                  <option
                    value="member"
                    style={{ backgroundColor: "#0f1535", color: "#888" }}
                  >
                    Member
                  </option>
                  <option
                    value="admin"
                    style={{ backgroundColor: "#0f1535", color: "#fdf900" }}
                  >
                    Admin
                  </option>
                </select>
              </div>
              <div className="manage-buttons">
                <button type="submit" disabled={adding} className="add-button">
                  {adding ? "Adding..." : "Add member"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="members-list">
        {loading ? (
          <p>Loading...</p>
        ) : members.length === 0 ? (
          <p>Žiadni členovia</p>
        ) : (
          <table className="nametags">
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Role</th>
                <th>Added At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="one-member">
              {members.map((member) => (
                <tr key={member.userId._id}>
                  <td>{member.userId.name || "-"}</td>
                  <td>{member.userId.surname || "-"}</td>
                  <td>{member.userId.email}</td>
                  <td className={`role-${member.role}`}>{member.role}</td>
                  <td>
                    {new Date(member.addedAt).toLocaleDateString("sk-SK")}
                  </td>
                  <td>
                    {member.userId._id !== activeWorkspace.owner && (
                      <button onClick={() => handleDelete(member.userId._id)}>
                        X
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default Members;
