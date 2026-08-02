import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import "./StudentTestyZoznam.css";

export default function StudentTestyZoznam() {
  const { t } = useTranslation();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiCallWithAuth("/tests/list-test");

      if (!response.ok) {
        throw new Error("Failed to load tests");
      }

      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error("Error loading tests:", error);
      setError(t("tests.loadTestError"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "successful":
        return {
          label: t("tests.statusSuccessful"),
          color: "#22c55e",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#22c55e"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          ),
        };
      case "unsuccessful":
        return {
          label: t("tests.statusUnsuccessful"),
          color: "#CD0303",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#CD0303"
              class="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          ),
        };
      default:
        return {
          label: t("tests.statusNotAttempted"),
          color: "#5D5D5D",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#5D5D5D"
              class="bi bi-exclamation-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
            </svg>
          ),
        };
    }
  };

  const handleStartTest = (testId) => {
    navigate(`/student/testy/${testId}`);
  };

  return (
    <div className="student-tests-list">
      {loading && <p>{t("tests.loadingTests")}</p>}
      {error && <p>{error}</p>}

      {tests.length === 0 && !loading && <p>{t("tests.noTests")}</p>}

      <div className="tests-table-header">
        <span>{t("tests.tableName")}</span>
        <span>{t("tests.tableDate")}</span>
        <span>{t("tests.tableScore")}</span>
        <span>{t("tests.tableStatus")}</span>
      </div>
      <div className="tests-table-body">
        {tests.map((test, index) => {
          const badge = getStatusBadge(test.status);
          const isCompleted = test.status !== "not_attempted";
          const percent = isCompleted
            ? Math.round(
                (parseFloat(test.total_score || 0) / (test.max_score || 1)) *
                  100,
              )
            : 0;
          return (
            <div className="table-element">
              <div
                key={test.id}
                className="tests-card"
                style={
                  isCompleted
                    ? {
                        background: `linear-gradient(to right, #234D9F ${percent}%, #6487C9 ${percent}%)`,
                        color: "white",
                      }
                    : {}
                }
              >
                <div className="tests-card-name">
                  <div className="icon-name">
                    <div
                      className={`tests-card-lock ${isCompleted ? "unlocked" : "locked"}`}
                    >
                      {isCompleted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#00D519"
                          class="bi bi-unlock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#00D519"
                          class="bi bi-unlock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="tests-card-title-wrapper">
                      <span>
                        {index + 1}. {test.title}
                      </span>
                    </div>
                  </div>
                  <button
                    className={`tests-card-btn ${isCompleted ? "btn-completed" : "btn-start"}`}
                    onClick={() => handleStartTest(test.id)}
                  >
                    {isCompleted
                      ? t("tests.buttonRetry")
                      : t("tests.buttonStart")}
                  </button>
                </div>
                <span className="tests-card-date">
                  {test.completion_date
                    ? new Date(test.completion_date).toLocaleDateString("sk-SK")
                    : "------ --, ---- - --:--"}
                </span>
                <span className="tests-card-score">
                  {isCompleted
                    ? `${parseFloat(test.total_score || 0).toFixed(1)} / ${test.max_score || 0}`
                    : `0 / ${test.max_score || 0}`}
                </span>
                <span
                  className="tests-card-status"
                  style={{ color: badge.color }}
                >
                  {badge.icon} {badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
