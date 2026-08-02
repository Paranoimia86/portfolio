import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../utils/api";
import "./StudentNavbar.css";

export default function StudentNavbar() {
  const { t, i18n } = useTranslation();
  const [showLectureDropdown, setShowLectureDropdown] = useState(false);
  const [showExcerciseDropdown, setShowExcerciseDropdown] = useState(false);
  const [showAssigmentsDropdown, setShowAssigmentsDropdown] = useState(false);
  const [showTestsActive, setShowTestsActive] = useState(false);
  const [showInfoActive, setShowInfoActive] = useState(false);
  const [lectureNames, setLectureNames] = useState({});
  const [exerciseNames, setExerciseNames] = useState({});
  const [assignmentNames, setAssignmentNames] = useState({});
  const navigate = useNavigate();
  const weeks = Array.from({ length: 13 }, (_, i) => i + 1);
  const assignmentWeeks = Array.from({ length: 3 }, (_, i) => i + 1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarButtons = document.querySelector(".navbar-buttons");
      if (navbarButtons && !navbarButtons.contains(event.target)) {
        setShowLectureDropdown(false);
        setShowExcerciseDropdown(false);
        setShowAssigmentsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchLectureNames = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const names = {};
        for (const week of weeks) {
          const response = await apiCallWithAuth(
            `/professor/get-lecture-content?week=${week}&language=${i18n.language}`,
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
            names[week] = match ? match[1] : `${t("student.week")} ${week}`;
          } else {
            names[week] = `${t("student.week")} ${week}`;
          }
        }
        setLectureNames(names);
      } catch (error) {
        console.error("Error fetching lecture names:", error);

        const names = {};
        weeks.forEach((week) => {
          names[week] = `${t("student.week")} ${week}`;
        });
        setLectureNames(names);
      }
    };

    fetchLectureNames();
  }, [i18n.language]);

  useEffect(() => {
    const fetchExerciseNames = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const names = {};
        for (const week of weeks) {
          const response = await apiCallWithAuth(
            `/professor/get-exercise-content?week=${week}&language=${i18n.language}`,
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
            names[week] = match ? match[1] : `${t("student.week")} ${week}`;
          } else {
            names[week] = `${t("student.week")} ${week}`;
          }
        }
        setExerciseNames(names);
      } catch (error) {
        console.error("Error fetching exercise names:", error);
        // Fallback
        const names = {};
        weeks.forEach((week) => {
          names[week] = `${t("student.week")} ${week}`;
        });
        setExerciseNames(names);
      }
    };

    fetchExerciseNames();
  }, [i18n.language]);

  useEffect(() => {
    const fetchAssignmentNames = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const names = {};
        for (const week of assignmentWeeks) {
          const response = await apiCallWithAuth(
            `/professor/get-assigment-content?week=${week}&language=${i18n.language}`,
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
            names[week] = match ? match[1] : `${t("student.week")} ${week}`;
          } else {
            names[week] = `${t("student.week")} ${week}`;
          }
        }
        setAssignmentNames(names);
      } catch (error) {
        console.error("Error fetching assignment names:", error);
        const names = {};
        assignmentWeeks.forEach((week) => {
          names[week] = `${t("student.week")} ${week}`;
        });
        setAssignmentNames(names);
      }
    };

    fetchAssignmentNames();
  }, [i18n.language]);

  const handleLectureSelect = (week) => {
    navigate(`/student/prednasky/${week}`);
    setShowLectureDropdown(false);
  };

  const handleExcerciseSelect = (week) => {
    navigate(`/student/cvicenia/${week}`);
    setShowExcerciseDropdown(false);
  };

  const handleAssigmentsSelect = (week) => {
    navigate(`/student/zadania/${week}`);
    setShowAssigmentsDropdown(false);
  };

  return (
    <nav className="student-navbar">
      <div className="navbar-buttons">
        <button
          className={showLectureDropdown ? "active" : ""}
          onClick={() => {
            setShowLectureDropdown(!showLectureDropdown);
            setShowExcerciseDropdown(false);
            setShowAssigmentsDropdown(false);
            setShowTestsActive(false);
            setShowInfoActive(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-easel"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z" />
          </svg>
          {t("navbar.lectures")}
        </button>
        {showLectureDropdown && (
          <div className="dropdown-menu">
            {weeks.map((week) => (
              <button key={week} onClick={() => handleLectureSelect(week)}>
                {lectureNames[week] || `${t("student.week")} ${week}`}
              </button>
            ))}
          </div>
        )}

        <button
          className={showExcerciseDropdown ? "active" : ""}
          onClick={() => {
            setShowExcerciseDropdown(!showExcerciseDropdown);
            setShowLectureDropdown(false);
            setShowAssigmentsDropdown(false);
            setShowTestsActive(false);
            setShowInfoActive(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-pen"
            viewBox="0 0 16 16"
          >
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
          </svg>
          {t("navbar.exercises")}
        </button>
        {showExcerciseDropdown && (
          <div className="dropdown-menu">
            {weeks.map((week) => (
              <button key={week} onClick={() => handleExcerciseSelect(week)}>
                {exerciseNames[week] || `${t("student.week")} ${week}`}
              </button>
            ))}
          </div>
        )}

        <button
          className={showAssigmentsDropdown ? "active" : ""}
          onClick={() => {
            setShowAssigmentsDropdown(!showAssigmentsDropdown);
            setShowLectureDropdown(false);
            setShowExcerciseDropdown(false);
            setShowTestsActive(false);
            setShowInfoActive(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-upload"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
          </svg>
          {t("navbar.assignments")}
        </button>
        {showAssigmentsDropdown && (
          <div className="dropdown-menu">
            {assignmentWeeks.map((week) => (
              <button key={week} onClick={() => handleAssigmentsSelect(week)}>
                {assignmentNames[week] || `${t("student.week")} ${week}`}
              </button>
            ))}
          </div>
        )}

        <button
          className={showTestsActive ? "active" : ""}
          onClick={() => {
            setShowTestsActive(!showTestsActive);
            setShowAssigmentsDropdown(false);
            setShowLectureDropdown(false);
            setShowExcerciseDropdown(false);
            setShowInfoActive(false);
            navigate("/student/testy");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-list-ol"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"
            />
            <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
          </svg>
          {t("navbar.tests")}
        </button>

        <button
          className={showInfoActive ? "active" : ""}
          onClick={() => {
            setShowInfoActive(!showInfoActive);
            setShowAssigmentsDropdown(false);
            setShowLectureDropdown(false);
            setShowExcerciseDropdown(false);
            setShowTestsActive(false);
            navigate("/student/informacie");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
          {t("navbar.info")}
        </button>
      </div>
    </nav>
  );
}
