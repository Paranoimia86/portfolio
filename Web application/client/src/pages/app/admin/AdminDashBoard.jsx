import { useState, useEffect } from "react";
import { apiCallWithAuth } from "../../../utils/api";
import { useTranslation } from "react-i18next";
import "./AdminDashBoard.css";

export default function AdminDashBoard() {
  const [professorData, setProfessorData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [groups, setGroups] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [professorGroups, setProfessorGroups] = useState([]);

  const days = [
    { value: "PO", label: "Pondelok (PO)" },
    { value: "UT", label: "Utorok (UT)" },
    { value: "ST", label: "Streda (ST)" },
    { value: "STV", label: "Štvrtok (STV)" },
    { value: "PIA", label: "Piatok (PIA)" },
  ];

  useEffect(() => {
    fetchGroups();
    fetchProfessors();
    fetchProfessorGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await apiCallWithAuth("/admin/groups");
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchProfessors = async () => {
    try {
      const response = await apiCallWithAuth("/admin/professors");
      if (response.ok) {
        const data = await response.json();
        setProfessors(data);
      }
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  const fetchProfessorGroups = async () => {
    try {
      const response = await apiCallWithAuth("/admin/professor-groups");
      if (response.ok) {
        const data = await response.json();
        setProfessorGroups(data);
      }
    } catch (error) {
      console.error("Error fetching professor groups:", error);
    }
  };

  const handleProfessorChange = (e) => {
    setProfessorData({
      ...professorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProfessor = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!professorData.email.endsWith("@tuke.sk")) {
      setError("Email must end with @tuke.sk");
      setLoading(false);
      return;
    }

    try {
      const response = await apiCallWithAuth("/admin/add-professor", {
        method: "POST",
        body: JSON.stringify(professorData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add professor");
      }
      const data = await response.json();
      setSuccess(
        `Professor added! Temporary password: ${data.tempPassword} - Share this with the professor`,
      );
      setProfessorData({ first_name: "", last_name: "", email: "" });
      fetchProfessors();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!selectedDay || !selectedTime) {
      setError("Please select both day and time for the group");
      setLoading(false);
      return;
    }

    try {
      const response = await apiCallWithAuth("/admin/create-group", {
        method: "POST",
        body: JSON.stringify({ day: selectedDay, time: selectedTime }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create group");
      }
      setSuccess("Group created successfully");
      setSelectedDay("");
      setSelectedTime("");
      fetchGroups();
    } catch (error) {
      setError(error.message || "Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignGroup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!selectedProfessor || !selectedGroup) {
      setError("Please select both professor and group");
      setLoading(false);
      return;
    }

    try {
      const response = await apiCallWithAuth(
        "/admin/assign-group-to-professor",
        {
          method: "POST",
          body: JSON.stringify({
            professorId: parseInt(selectedProfessor),
            groupId: parseInt(selectedGroup),
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to assign group to professor",
        );
      }
      setSuccess("Group assigned to professor successfully");
      setSelectedProfessor("");
      setSelectedGroup("");
      fetchProfessorGroups();
    } catch (error) {
      setError(error.message || "Failed to assign group to professor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-controls">
        <div className="adding-section">
          <div className="add-form">
            <h2>{t("admin.addProfessor")}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleAddProfessor}>
              <div>
                <label>{t("admin.firstName")}</label>
                <input
                  type="text"
                  placeholder={t("admin.firstName")}
                  name="first_name"
                  value={professorData.first_name}
                  onChange={handleProfessorChange}
                />
              </div>
              <div>
                <label>{t("admin.lastName")}</label>
                <input
                  type="text"
                  placeholder={t("admin.lastName")}
                  name="last_name"
                  value={professorData.last_name}
                  onChange={handleProfessorChange}
                />
              </div>
              <div>
                <label>{t("admin.email")}</label>
                <input
                  type="email"
                  placeholder="test.test@tuke.sk"
                  name="email"
                  value={professorData.email}
                  onChange={handleProfessorChange}
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Adding..." : t("admin.addProfessor")}
              </button>
            </form>
          </div>
          <div className="add-form">
            <h2>{t("admin.createGroup")}</h2>
            <form onSubmit={handleCreateGroup}>
              <div>
                <label>{t("admin.groupDay")}</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  required
                >
                  <option value="">{t("admin.selectDay")}</option>
                  {days.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>{t("admin.groupTime")}</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : t("admin.createGroup")}
              </button>
            </form>
          </div>
          <div className="add-form">
            <h2>{t("admin.assignGroup")}</h2>
            <form onSubmit={handleAssignGroup}>
              <div>
                <label>{t("admin.selectProfessor")}</label>
                <select
                  value={selectedProfessor}
                  onChange={(e) => setSelectedProfessor(e.target.value)}
                  required
                >
                  <option value="">{t("admin.selectProfessor")}</option>
                  {professors.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.first_name} {prof.last_name} ({prof.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>{t("admin.selectGroupToAssign")}</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  required
                >
                  <option value="">{t("admin.selectGroupToAssign")}</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.day} {group.time}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Assigning..." : t("admin.assignGroup")}
              </button>
            </form>
          </div>
        </div>
        <div className="border"></div>
        <div className="professor-groups-section">
          <h2>{t("admin.professorGroups")}</h2>
          <table>
            <thead>
              <tr>
                <th>{t("admin.professorName")}</th>
                <th>{t("admin.professorEmail")}</th>
                <th>{t("admin.groupDay")}</th>
                <th>{t("admin.groupTime")}</th>
              </tr>
            </thead>
            <tbody>
              {professorGroups.map((profGroup) => (
                <tr key={`${profGroup.id}-${profGroup.group_id}`}>
                  <td>
                    {profGroup.first_name} {profGroup.last_name}
                  </td>
                  <td>{profGroup.email}</td>
                  <td>{profGroup.day || "-"}</td>
                  <td>{profGroup.time || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
