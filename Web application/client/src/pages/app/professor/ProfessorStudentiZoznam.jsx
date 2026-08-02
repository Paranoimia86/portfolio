import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import "./ProfessorStudentiZoznam.css";

export default function ProfessorStudentiZoznam() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      loadStudentsInGroup(selectedGroupId);
    }
  }, [selectedGroupId]);

  const loadGroups = async () => {
    try {
      const groupsResponse = await apiCallWithAuth("/users/professor/groups");
      if (!groupsResponse.ok) throw new Error("Failed to load groups");
      const groupsData = await groupsResponse.json();
      setGroups(groupsData);

      if (groupsData.length > 0) {
        setSelectedGroupId(groupsData[0].id);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loadStudentsInGroup = async (groupId) => {
    try {
      setLoading(true);
      const studentsResponse = await apiCallWithAuth(
        `/users/group/${groupId}/students`,
      );
      if (!studentsResponse.ok) throw new Error("Failed to load students");

      const data = await studentsResponse.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentDetails = async (studentId) => {
    navigate(`/professor/studenti/${studentId}`);
  };

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfFirst = (currentPage - 1) * studentsPerPage;
  const indexOfLast = indexOfFirst + studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);

  if (loading) return <div>{t("professor.loadingStudents")}</div>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        {t("common.error")}: {error}
      </div>
    );
  return (
    <div className="students-list">
      <div className="students-header">
        <h1>{t("professor.students")}</h1>

        {groups.length > 1 && (
          <select
            value={selectedGroupId || ""}
            className="group-select"
            onChange={(e) => setSelectedGroupId(parseInt(e.target.value))}
          >
            <option value="">{t("professor.selectGroup")}</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.day} {group.time} ({group.student_count}{" "}
                {t("professor.students")})
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>{t("professor.studentCard")}</th>
              <th>{t("professor.firstName")}</th>
              <th>{t("professor.lastName")}</th>
              <th>{t("professor.score")}</th>
              <th>{t("professor.group")}</th>
              <th>{t("professor.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.student_id_number || "-"}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>

                <td>
                  {student.total_points} / {student.max_points}
                </td>
                <td>
                  {student.day} {student.time}
                </td>
                <td>
                  <button
                    className="more-info-link"
                    onClick={() => handleStudentDetails(student.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                    {t("professor.details")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
