import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import "./StudentTesty.css";

export default function StudentTesty() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [testStartTime] = useState(Date.now());

  const [answers, setAnswers] = useState({});
  const [showEarlySubmitConfirm, setShowEarlySubmitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    loadTest();
  }, [id]);

  useEffect(() => {
    if (!test || !attemptId || submitted || showSummary) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - testStartTime) / 1000);
      const totalSeconds = test.time_limit_minutes * 60;
      const remaining = totalSeconds - elapsed;

      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [test, attemptId, submitted, showSummary, testStartTime]);

  const loadTest = async () => {
    try {
      const response = await apiCallWithAuth(`/tests/${id}`);
      if (!response.ok) throw new Error("Failed to load test");

      const data = await response.json();
      setTest(data);
      setQuestions(data.questions || []);

      const startResponse = await apiCallWithAuth(`/tests/${id}/start`, {
        method: "POST",
      });

      if (startResponse.status === 403) {
        setError(t("tests.alreadyCompleted"));
        navigate("/student/testy");
        return;
      }

      if (!startResponse.ok) throw new Error("Failed to start test");
      const startData = await startResponse.json();
      setAttemptId(startData.attempt_id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleOptionToggle = (questionId, optionId, isChecked) => {
    const currentOptions = answers[questionId] || [];

    let updatedOptions;

    if (isChecked) {
      updatedOptions = [...currentOptions, optionId];
    } else {
      updatedOptions = currentOptions.filter((opt) => opt !== optionId);
    }

    setAnswers({
      ...answers,
      [questionId]: updatedOptions,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGoToQuestion = (index) => {
    setShowSummary(false);
    setCurrentQuestionIndex(index);
  };

  const formatTime = (seconds) => {
    if (seconds === null) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const isAnswered = (question) => {
    const answer = answers[question.id];
    if (
      question.question_type === "single_choice" ||
      question.question_type === "multiple_choice"
    ) {
      return answer && (Array.isArray(answer) ? answer.length > 0 : answer);
    } else {
      return answer && answer.trim() !== "";
    }
  };

  const handleSubmit = async (isAutomatic = false) => {
    if (!isAutomatic) {
      // Keď je manuálne, modálne okno sa už zobrazuje, tak len odošli
    }

    try {
      const token = localStorage.getItem("accessToken");
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answer]) => {
          const question = questions.find((q) => q.id === parseInt(questionId));

          if (
            question?.question_type === "single_choice" ||
            question?.question_type === "multiple_choice"
          ) {
            return {
              question_id: parseInt(questionId),
              selected_options: Array.isArray(answer) ? answer : [answer],
            };
          } else {
            return {
              question_id: parseInt(questionId),
              answer_text: answer,
            };
          }
        },
      );

      const response = await fetch(
        `http://localhost:5000/api/tests/${id}/submit-answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            attempt_id: attemptId,
            answers: formattedAnswers,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to submit answers");

      setSubmitted(true);
      navigate("/student/testy");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEarlySubmit = () => {
    setShowEarlySubmitConfirm(true);
  };

  const confirmEarlySubmit = async () => {
    setShowEarlySubmitConfirm(false);
    await handleSubmit();
  };

  if (loading) return <div>{t("tests.loadingTest")}</div>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        {t("common.error")}: {error}
      </div>
    );
  if (!test) return <div>{t("tests.testNotFound")}</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  return (
    <div className="student-test-container">
      <div className="test-section">
        <div className="test-info">
          <div className="time-remaining">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-hourglass-split"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
            </svg>
            {timeRemaining !== null && (
              <div className={`timer ${timeRemaining < 60 ? "warning" : ""}`}>
                {t("tests.timeRemaining")}{" "}
                <strong>{formatTime(timeRemaining)}</strong>
                {timeRemaining < 60 && <span>{t("tests.timeWarning")}</span>}
              </div>
            )}
          </div>
          {!showSummary && (
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          )}
        </div>

        {submitted ? (
          <div className="success-message">
            <p>{t("tests.testSubmitted")}</p>
            <button onClick={() => navigate("/student/testy")}>
              {t("tests.backToTests")}
            </button>
          </div>
        ) : showSummary ? (
          <div className="summary-container">
            <h2>{t("tests.testSummary")}</h2>

            <div className="questions-summary">
              <div className="questions-summary-header">
                <span>{t("tests.question")}</span>
                <span>{t("tests.status")}</span>
                <span></span>
              </div>
              {questions.map((question, idx) => (
                <div key={`summary-${question.id}`} className="summary-item">
                  <div className="summary-info">
                    <span className="question-number">Otázka {idx + 1}</span>
                    <span
                      className={`status ${isAnswered(question) ? "answered" : "unanswered"}`}
                    >
                      {isAnswered(question) ? "Vyplnená" : "Nevyplnená"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleGoToQuestion(idx)}
                    className="btn-view"
                  >
                    Zobraziť
                  </button>
                </div>
              ))}
            </div>

            <div className="actions">
              <button
                onClick={() => setShowSummary(false)}
                className="btn-secondary"
              >
                Späť na otázky
              </button>
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="btn-primary"
              >
                Odoslať test
              </button>
            </div>
          </div>
        ) : currentQuestion ? (
          <div className="questions-container">
            <div className="question-block">
              <p className="index">{currentQuestionIndex + 1}</p>{" "}
              <p>{currentQuestion.question_text}</p>
            </div>
            <div className="nav-section">
              <button
                onClick={handlePreviousQuestion}
                disabled={isFirstQuestion}
                className="btn-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-arrow-left-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                </svg>
                {t("tests.buttonPreviousQuestion")}
              </button>
              <button onClick={handleNextQuestion} className="btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-arrow-right-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                </svg>
                {currentQuestionIndex === questions.length - 1 ? (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    {t("tests.buttonSummary")}
                  </p>
                ) : (
                  t("tests.buttonNextQuestion")
                )}
              </button>
            </div>
            <div className="answer-section">
              {(currentQuestion.question_type === "single_choice" ||
                currentQuestion.question_type === "multiple_choice") && (
                <div className="options">
                  {currentQuestion.options?.map((option, optIdx) => (
                    <label key={`option-${optIdx}-${option.id}`}>
                      <input
                        type={
                          currentQuestion.question_type === "single_choice"
                            ? "radio"
                            : "checkbox"
                        }
                        name={`question-${currentQuestion.id}`}
                        value={option.id}
                        checked={
                          currentQuestion.question_type === "single_choice"
                            ? answers[currentQuestion.id] === option.id
                            : (answers[currentQuestion.id] || []).includes(
                                option.id,
                              )
                        }
                        onChange={(e) => {
                          if (
                            currentQuestion.question_type === "single_choice"
                          ) {
                            handleAnswerChange(currentQuestion.id, option.id);
                          } else {
                            handleOptionToggle(
                              currentQuestion.id,
                              option.id,
                              e.target.checked,
                            );
                          }
                        }}
                      />
                      {option.option_text}
                    </label>
                  ))}
                </div>
              )}
              {(currentQuestion.question_type === "short_text" ||
                currentQuestion.question_type === "long_text") && (
                <div className="text-answer">
                  <textarea
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion.id, e.target.value)
                    }
                    placeholder="Napíš svoju odpoveď..."
                    rows={currentQuestion.question_type === "long_text" ? 5 : 2}
                  />
                </div>
              )}
            </div>
            <div className="actions">
              <button onClick={handleEarlySubmit} className="btn-danger">
                {t("tests.buttonEndTest")}
              </button>
            </div>
          </div>
        ) : null}

        {showSubmitConfirm && (
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
                <h3>{t("tests.confirmSubmitTitle")}</h3>
                <p>{t("tests.confirmSubmitMessage")}</p>
              </div>
              <div className="confirm-actions">
                <button
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    handleSubmit();
                  }}
                  className="submit-btn"
                >
                  {t("tests.confirmSubmitButton")}
                </button>
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="cancel-btn"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </div>
          </div>
        )}

        {showEarlySubmitConfirm && (
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
                <h3>{t("tests.confirmSubmitTitle")}</h3>
                <p>{t("tests.confirmSubmitMessage")}</p>
              </div>
              <div className="confirm-actions">
                <button onClick={confirmEarlySubmit} className="submit-btn">
                  {t("tests.confirmSubmitButton")}
                </button>
                <button
                  onClick={() => setShowEarlySubmitConfirm(false)}
                  className="cancel-btn"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
