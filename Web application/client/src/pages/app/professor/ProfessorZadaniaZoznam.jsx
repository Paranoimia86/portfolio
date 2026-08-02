import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { apiCallWithAuth } from "../../../utils/api";
import "./ProfessorZadaniaZoznam.css";

export default function ProfessorAssignmentsList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const parts = useMemo(() => Array.from({ length: 3 }, (_, i) => i + 1), []);
  const [assignmentNames, setAssignmentNames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentNames = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const names = {};
        for (const part of parts) {
          const response = await apiCallWithAuth(
            `/professor/get-assigment-content?week=${part}&language=${i18n.language}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (response.ok) {
            const data = await response.json();
            const content = data.content;
            const match = content.match(/^#\s+(.+)$/m);
            names[part] = match ? match[1] : `${t("professor.part")} ${part}`;
          } else {
            names[part] = `${t("professor.part")} ${part}`;
          }
        }
        setAssignmentNames(names);
      } catch (error) {
        console.error("Error fetching assignment names:", error);
        const names = {};
        parts.forEach((part) => {
          names[part] = `${t("professor.part")} ${part}`;
        });
        setAssignmentNames(names);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentNames();
  }, [i18n.language, t, parts]);

  if (loading) {
    return <div>{t("common.loading")}</div>;
  }

  return (
    <div className="professor-assignments-list">
      <h1>{t("professor.myAssignments")}</h1>
      <div className="assignments-container">
        {parts.map((part) => (
          <div key={part} className="assignment-card">
            <span className="assignment-name">
              {assignmentNames[part] || `${t("professor.part")} ${part}`}
            </span>

            <button
              className="edit-button"
              onClick={() => navigate(`/professor/zadania/${part}`)}
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
              {t("professor.edit")}
            </button>
          </div>
        ))}
      </div>
      <div className="decoration">Dekorácia</div>
    </div>
  );
}
