import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import "./ProfessorTestyZoznam.css";

export default function ProfessorTestyZoznam() {
  const { t } = useTranslation();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testName, setTestName] = useState("");
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);
  const [, setShowConfirm] = useState(false);

  const loadTests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiCallWithAuth("/tests/professor/list");

      if (!response.ok) {
        throw new Error("Failed to load tests");
      }

      const data = await response.json();
      setTests(data.tests);
      setStats(data.stats);
    } catch (error) {
      console.error("Error loading tests:", error);
      setError(t("tests.loadTestError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleCreateTest = async () => {
    if (!testName.trim()) {
      alert(t("tests.confirmDeletePrompt"));
      return;
    }

    try {
      const response = await apiCallWithAuth("/tests/professor/create", {
        method: "POST",
        body: JSON.stringify({ title: testName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create test");
      }

      setTestName("");
      loadTests();
    } catch (error) {
      console.error("Error creating test:", error);
      alert(t("tests.createTestError"));
    }
  };

  const handleEditTest = (testId) => {
    navigate(`/professor/testy/${testId}`);
  };

  const handleDeleteTest = (testId) => {
    setTestToDelete(testId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTest = async () => {
    try {
      const response = await apiCallWithAuth(`/tests/${testToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete test");
      }

      setShowDeleteConfirm(false);
      setTestToDelete(null);
      loadTests();
    } catch (error) {
      console.error("Error deleting test:", error);
      alert(t("tests.deleteTestError"));
      setShowDeleteConfirm(false);
      setTestToDelete(null);
    }
  };

  return (
    <div className="professor-tests-list">
      <div className="tests-header">
        <h1>{t("tests.myTests")}</h1>
        <div className="create-test">
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder={t("tests.testNamePlaceholder")}
          />
          <button onClick={handleCreateTest}>{t("tests.createTestBtn")}</button>
        </div>
      </div>
      {loading && <p>{t("tests.loadingTests")}</p>}
      {error && <p>{error}</p>}
      <div className="tests-table">
        {tests.length === 0 && !loading && (
          <p className="no-tests">{t("tests.noTestsCreated")}</p>
        )}

        {tests.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>{t("tests.tableNumber")}</th>
                <th>{t("tests.tableName")}</th>
                <th>{t("tests.tableCreatedDate")}</th>
                <th>{t("tests.tableAverageScore")}</th>
                <th>{t("tests.tableSuccessRate")}</th>
                <th>{t("tests.tableAction")}</th>
              </tr>
            </thead>
            <tbody>
              {tests
                .sort((a, b) => a.id - b.id)
                .map((test, index) => (
                  <tr key={test.id}>
                    <td>{index + 1}</td>
                    <td>{test.title}</td>
                    <td>
                      {new Date(test.created_at).toLocaleDateString("sk-SK")}
                    </td>
                    <td>
                      {test.avg_score !== null
                        ? `${parseFloat(test.avg_score).toFixed(1)} / ${test.max_score || 0}`
                        : "-"}
                    </td>
                    <td>
                      {test.success_rate !== null
                        ? `${test.success_rate}%`
                        : "-"}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEditTest(test.id)}
                          className="edit-btn"
                        >
                          {t("tests.editBtn")}
                        </button>
                        <button
                          onClick={() => handleDeleteTest(test.id)}
                          className="delete-btn"
                        >
                          {t("tests.deleteBtn")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="tests-stats-section">
        {stats && (
          <div className="tests-stats">
            <div className="stat-item">
              <p>{t("tests.averageSuccessRate")} </p>
              <strong>{stats.average_success_rate}%</strong>
            </div>
            <div className="stat-item">
              <p>{t("tests.averageTimePerQuestion")} </p>
              <strong>
                {stats.average_time_per_question > 0
                  ? `${parseFloat(stats.average_time_per_question).toFixed(1)} ${t("tests.seconds")}`
                  : "-"}
              </strong>
            </div>
            <div className="stat-item">
              <p>{t("tests.averageTimePerTest")} </p>
              <strong>
                {stats.average_time_per_test > 0
                  ? `${(parseFloat(stats.average_time_per_test) / 60).toFixed(2)} ${t("tests.minutes")}`
                  : "-"}
              </strong>
            </div>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="confirm-window">
          <div className="confirm-content">
            <div className="confirm-message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                class="bi bi-exclamation-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
              </svg>
              <h3>{t("tests.confirmDeleteTestTitle")}</h3>
              <p>{t("tests.confirmDeleteTestMessage")}</p>
            </div>
            <div className="confirm-actions">
              <button
                onClick={() => {
                  confirmDeleteTest();
                  setShowConfirm(false);
                }}
                className="delete-btn-confirm"
              >
                {t("tests.deleteTestConfirmBtn")}
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setTestToDelete(null);
                }}
                className="cancel-btn"
              >
                {t("common.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
