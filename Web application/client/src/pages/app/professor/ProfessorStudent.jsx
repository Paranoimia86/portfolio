import { useState, useEffect, useCallback, React } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import DonutChart from "../../components/DonutChart";
import LectureCards from "../../components/LectureCards";
import "./ProfessorStudent.css";

export default function ProfessorStudentDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [lectureStats, setLectureStats] = useState([]);
  const [testStats, setTestStats] = useState([]);
  const [grades, setGrades] = useState({
    homework_points: 0,
    exam_points: 0,
    total_points: 0,
  });
  const [editingGrades, setEditingGrades] = useState({
    homework_points: 0,
    exam_points: 0,
  });
  const [isEditingGrades, setIsEditingGrades] = useState(false);
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStudentDetails = useCallback(async () => {
    try {
      const response = await apiCallWithAuth(`/users/${id}`);
      if (!response.ok) throw new Error("Failed to load student");

      const data = await response.json();
      setStudent(data);

      const statsResponse = await apiCallWithAuth(
        `/lectures/student/${id}/stats`,
      );
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setLectureStats(statsData);
      }

      const testsResponse = await apiCallWithAuth(`/users/${id}/tests`);
      if (testsResponse.ok) {
        const testsData = await testsResponse.json();
        setTestStats(testsData);
      }

      const gradesResponse = await apiCallWithAuth(`/users/${id}/grades`);
      if (gradesResponse.ok) {
        const gradesData = await gradesResponse.json();
        setGrades(gradesData);
        setEditingGrades({
          homework_points: gradesData.homework_points,
          exam_points: gradesData.exam_points,
        });
      }

      const attendanceResponse = await apiCallWithAuth(
        `/users/${id}/attendance`,
      );
      if (attendanceResponse.ok) {
        const attendanceData = await attendanceResponse.json();
        setAttendance(attendanceData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadStudentDetails();
  }, [loadStudentDetails]);

  const calculateGrade = (totalPoints) => {
    if (totalPoints >= 90) return "A";
    if (totalPoints >= 80) return "B";
    if (totalPoints >= 70) return "C";
    if (totalPoints >= 60) return "D";
    if (totalPoints >= 50) return "E";
    return "FX";
  };

  const handleUpdateGrades = async () => {
    try {
      const response = await apiCallWithAuth(`/users/${id}/grades`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGrades),
      });

      if (response.ok) {
        const updatedGrades = await response.json();
        setGrades(updatedGrades);
        setIsEditingGrades(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateAttendance = async (week, attended, excused) => {
    try {
      const response = await apiCallWithAuth(
        `/users/${id}/attendance/${week}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ attended, excused }),
        },
      );

      if (response.ok) {
        setAttendance((prev) =>
          prev.map((a) =>
            a.week_number === week
              ? { week_number: week, attended, excused }
              : a,
          ),
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>{t("tests.loading")}</div>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        {t("common.error")}: {error}
      </div>
    );
  if (!student) return <div>{t("professor.studentNotFound")}</div>;

  return (
    <div className="professor-student-details">
      <button onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-arrow-left-square-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
        </svg>
      </button>
      <div className="first-row">
        <div className="student-info">
          <div className="student-profile">
            <div className="student-photo">
              {student.profile_photo ? (
                <img
                  src={student.profile_photo}
                  alt={`${student.first_name} ${student.last_name}`}
                />
              ) : (
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  👤
                </div>
              )}
            </div>

            <div className="student-basic-info">
              <h1>
                {student.first_name} {student.last_name}
              </h1>

              <p>{student.email}</p>

              <p>{student.student_id_number || "-"}</p>

              <p>
                {student.exercise_group_id && student.day && student.time
                  ? `${student.day} ${student.time}`
                  : "-"}
              </p>
            </div>
          </div>
          <div className="student-additional-info">
            <div className="student-additional-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-cake"
                viewBox="0 0 16 16"
              >
                <path d="m7.994.013-.595.79a.747.747 0 0 0 .101 1.01V4H5a2 2 0 0 0-2 2v3H2a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2h-1V6a2 2 0 0 0-2-2H8.5V1.806A.747.747 0 0 0 8.592.802zM4 6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v.414a.9.9 0 0 1-.646-.268 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0A.9.9 0 0 1 4 6.414zm0 1.414c.49 0 .98-.187 1.354-.56a.914.914 0 0 1 1.292 0c.748.747 1.96.747 2.708 0a.914.914 0 0 1 1.292 0c.374.373.864.56 1.354.56V9H4zM1 11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.793l-.354.354a.914.914 0 0 1-1.293 0 1.914 1.914 0 0 0-2.707 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0L1 11.793zm11.646 1.854a1.915 1.915 0 0 0 2.354.279V15H1v-1.867c.737.452 1.715.36 2.354-.28a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.708 0a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.707 0a.914.914 0 0 1 1.293 0Z" />
              </svg>
              <p style={{ margin: "5px 0", fontWeight: "500" }}>
                {student.date_of_birth
                  ? new Date(student.date_of_birth).toLocaleDateString("sk-SK")
                  : "-"}
              </p>
            </div>

            <div className="student-additional-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-building"
                viewBox="0 0 16 16"
              >
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
              </svg>
              <p style={{ margin: "5px 0", fontWeight: "500" }}>
                {student.school || "-"}
              </p>
            </div>

            <div className="student-additional-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <p style={{ margin: "5px 0", fontWeight: "500" }}>
                {student.address || "-"}
              </p>
            </div>
          </div>

          <div className="student-grade">
            <h1>{t("professor.grade")}</h1>
            <p>{calculateGrade(grades.total_points)}</p>
          </div>
        </div>

        <div className="student-attendance">
          <h1>{t("professor.attendance")}</h1>
          <p>{t("professor.attendanceDescription")}</p>
          <div className="attendance-table">
            <table>
              <thead>
                <tr>
                  <th className="attendance-column">{t("professor.week")}</th>
                  <th className="attendance-column">
                    {t("professor.attended")}
                  </th>
                  <th>{t("professor.excused")}</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.week_number}>
                    <td className="attendance-column">
                      {t("professor.week")} {record.week_number}
                    </td>
                    <td className="attendance-column">
                      <select
                        value={record.attended}
                        onChange={(e) =>
                          handleUpdateAttendance(
                            record.week_number,
                            e.target.value,
                            record.excused,
                          )
                        }
                        style={{
                          backgroundColor:
                            record.attended === "yes"
                              ? "#0DFF00"
                              : record.attended === "late"
                                ? "#FFA238"
                                : "#FF0000",

                          fontWeight: "bold",
                          padding: "5px",
                        }}
                      >
                        <option
                          value="yes"
                          style={{ backgroundColor: "#0DFF00" }}
                        >
                          {t("professor.yes")}
                        </option>
                        <option
                          value="late"
                          style={{ backgroundColor: "#FFA238" }}
                        >
                          {t("professor.late")}
                        </option>
                        <option
                          value="no"
                          style={{ backgroundColor: "#FF0000" }}
                        >
                          {t("professor.no")}
                        </option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={record.excused ? "yes" : "no"}
                        onChange={(e) =>
                          handleUpdateAttendance(
                            record.week_number,
                            record.attended,
                            e.target.value === "yes",
                          )
                        }
                        style={{
                          backgroundColor: record.excused
                            ? "#0DFF00"
                            : "#FF0000",

                          fontWeight: "bold",
                          padding: "5px",
                        }}
                      >
                        <option
                          value="yes"
                          style={{ backgroundColor: "#0DFF00" }}
                        >
                          {t("professor.yes")}
                        </option>
                        <option
                          value="no"
                          style={{ backgroundColor: "#FF0000" }}
                        >
                          {t("professor.no")}
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="second-row">
        <div className="student-tests">
          <h1>{t("navbar.tests")}</h1>
          <p>{t("professor.testResults")}</p>
          {testStats.length > 0 ? (
            testStats
              .sort((a, b) => a.id - b.id)
              .map((test) => {
                const percent =
                  test.score != null && test.max_score
                    ? Math.round((test.score / test.max_score) * 100)
                    : 0;
                const colorClass =
                  percent >= 75 ? "high" : percent >= 50 ? "medium" : "low";

                return (
                  <>
                    <div key={test.id} className="test-result">
                      <h4>
                        {test.id}. {test.title}
                      </h4>
                      <p>
                        {(test.status === "graded" ||
                          test.status === "submitted") &&
                        test.score != null &&
                        test.max_score != null
                          ? `${Math.round(test.score)}/${Math.round(test.max_score)}`
                          : "-"}
                      </p>
                    </div>
                    <div className="test-result-bar">
                      <div
                        className={`test-result-bar-fill ${colorClass}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </>
                );
              })
          ) : (
            <p>{t("professor.noTestsCompleted")}</p>
          )}
        </div>

        <div className="student-points">
          <div className="points-header">
            <h1>{t("professor.grading")}</h1>
            <button
              onClick={(e) => {
                (setIsEditingGrades(true), e.preventDefault());
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
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
            </button>
          </div>

          {isEditingGrades ? (
            <div className="confirm-window">
              <div className="confirm-content">
                <button
                  onClick={() => setIsEditingGrades(false)}
                  className="close-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                  </svg>
                </button>

                <div className="confirm-message">
                  <h3>{t("professor.grading")}</h3>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <label>{t("professor.homeworkPoints")} (max 40):</label>
                      <input
                        type="number"
                        min="0"
                        max="40"
                        value={editingGrades.homework_points}
                        onChange={(e) =>
                          setEditingGrades({
                            ...editingGrades,
                            homework_points: Math.min(
                              40,
                              Math.max(0, parseFloat(e.target.value) || 0),
                            ),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>{t("professor.examPoints")} (max 60):</label>
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={editingGrades.exam_points}
                        onChange={(e) =>
                          setEditingGrades({
                            ...editingGrades,
                            exam_points: Math.min(
                              60,
                              Math.max(0, parseFloat(e.target.value) || 0),
                            ),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="confirm-actions">
                  <button className="save-btn" onClick={handleUpdateGrades}>
                    {t("common.save")}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsEditingGrades(false)}
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="points-stats">
              <DonutChart
                value={Math.round(grades.homework_points)}
                max={40}
                label={t("professor.homework")}
                color="#00ff00"
              />
              <DonutChart
                value={Math.round(grades.exam_points)}
                max={60}
                label={t("professor.exam")}
                color="#00ff00"
              />
              <DonutChart
                value={Math.round(grades.total_points)}
                max={100}
                label={t("professor.semesterTotal")}
                color="#00ff00"
              />
            </div>
          )}
        </div>
      </div>
      <div className="third-row">
        <div className="student-activity">
          <h1>{t("professor.timeSpentName")}</h1>
          <p>{t("professor.timeSpentLectures")}</p>
          <LectureCards lectureStats={lectureStats} />
        </div>
      </div>
    </div>
  );
}
