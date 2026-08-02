import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../utils/api";
import { useWorkspace } from "../../hooks/useWorkspace";
import "./Projects.css";

function Projects() {
  const { activeWorkspace, loading: workspaceLoading } = useWorkspace();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (activeWorkspace) {
      loadProjects();
    }
  }, [activeWorkspace]);

  const loadProjects = async () => {
    if (!activeWorkspace) return;
    setLoading(true);
    try {
      const response = await fetchWithAuth(
        `/projects?workspaceId=${activeWorkspace._id}`,
      );
      const data = await response.json();
      if (response.ok) {
        setProjects(data.projects || []);
      } else {
        setError(data.message || "Failed to load projects");
      }
    } catch (err) {
      setError("Failed to load projects:" + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProjects = async (e) => {
    e.preventDefault();
    setError("");
    setCreating(true);
    try {
      const response = await fetchWithAuth("/projects", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          image,
          status,
          workspaceId: activeWorkspace._id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setName("");
        setDescription("");
        setImage("");
        setStatus("active");
        setShowCreateForm(false);
        loadProjects();
      } else {
        setError(data.message || "Failed to create project");
      }
    } catch (err) {
      setError("Failed to create project:" + err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      const response = await fetchWithAuth(`/projects/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        loadProjects();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete project");
      }
    } catch (err) {
      setError("Failed to delete project:" + err.message);
    }
  };

  if (workspaceLoading) {
    return <div>Loading...</div>;
  }

  if (!activeWorkspace) {
    return <div>No workspace selected</div>;
  }

  return (
    <div>
      <div className="add-project-topic">
        <h1>Projects - {activeWorkspace.name}</h1>
        <p>Manage projects in this workspace</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="add-project">
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="create-project-button"
            >
              Create New Project
            </button>
          )}
          {showCreateForm && (
            <form onSubmit={handleCreateProjects}>
              <div className="form-group">
                <div className="add-input-group">
                  <input
                    type="text"
                    placeholder="Project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={creating}
                  />

                  <textarea
                    placeholder="Decription (optinal)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={creating}
                  />
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option
                    value="active"
                    style={{ backgroundColor: "#0f1535", color: "#17bd17" }}
                  >
                    Active
                  </option>
                  <option
                    value="completed"
                    style={{ backgroundColor: "#0f1535", color: "#0fd7fa" }}
                  >
                    Completed
                  </option>
                  <option
                    value="archived"
                    style={{ backgroundColor: "#0f1535", color: "#e21406" }}
                  >
                    Archived
                  </option>
                </select>
              </div>
              <div className="adding-buttons">
                <button
                  type="submit"
                  disabled={creating}
                  className="create-button"
                >
                  {creating ? "Creating..." : "Create project"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="cancel-add-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="projects-list">
        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No projects in this workspace</p>
        ) : (
          <table className="nametags">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="one-project">
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <strong>{project.name}</strong>
                  </td>
                  <td>{project.description || "-"}</td>
                  <td className={`status-${project.status}`}>
                    {project.status}
                  </td>
                  <td>
                    {project.createdBy.name} {project.createdBy.surname || "-"}
                  </td>
                  <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDeleteProject(project._id)}>
                      X
                    </button>
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
export default Projects;
