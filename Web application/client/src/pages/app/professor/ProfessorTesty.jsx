import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditPanel from "../../components/EditPanel";
import { apiCallWithAuth } from "../../../utils/api";
import "./ProfessorTesty.css";

export default function ProfessorTesty() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("single_choice");
  const [points, setPoints] = useState(1);
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswers, setCorrectAnswers] = useState([false, false]);
  const [, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const loadTest = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`/api/tests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to load test");

        const data = await response.json();
        setTest({
          id: data.id,
          title: data.title,
          time_limit_minutes: data.time_limit_minutes,
          questions_to_display: data.questions_to_display,
        });
        setQuestions(data.questions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTest();
  }, [id]);

  const handleAddQuestion = async () => {
    if (!questionText.trim()) {
      alert(t("tests.enterQuestionText"));
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        question_text: questionText,
        question_type: questionType,
        points,
      };

      if (
        questionType === "single_choice" ||
        questionType === "multiple_choice"
      ) {
        payload.options = options.map((opt, idx) => ({
          option_text: opt,
          is_correct: correctAnswers[idx],
        }));
      } else {
        payload.correct_answers = options
          .map((opt, idx) => ({
            text: opt,
            case_sensitive: correctAnswers[idx],
          }))
          .filter((ans) => ans.text.trim());
      }

      const response = await fetch(`/api/tests/${id}/questions/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add question");

      const newQuestion = await response.json();
      setQuestions([...questions, newQuestion]);

      setQuestionText("");
      setOptions(["", ""]);
      setCorrectAnswers([false, false]);
      setPoints(1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await apiCallWithAuth(
        `/tests/${id}/questions/${questionId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) throw new Error("Failed to delete question");

      setQuestions(questions.filter((q) => q.id !== questionId));
      setQuestionToDelete(null);
    } catch (err) {
      setError(err.message);
      setQuestionToDelete(null);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
    setCorrectAnswers([...correctAnswers, false]);
  };

  // Zmena možnosti
  const updateOption = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const toggleCorrect = (idx) => {
    const newCorrect = [...correctAnswers];
    if (questionType === "single_choice") {
      newCorrect.fill(false);
      newCorrect[idx] = true;
    } else {
      newCorrect[idx] = !newCorrect[idx];
    }
    setCorrectAnswers(newCorrect);
  };
  if (loading) return <div>{t("tests.loading")}</div>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        {t("common.error")}: {error}
      </div>
    );
  if (!test) return <div>{t("tests.testNotFound")}</div>;

  return (
    <div className="professor-testy">
      <h1>{test.title}</h1>

      <div className="add-question-section">
        <EditPanel
          content={questionText}
          onChange={setQuestionText}
          onSave={() => {}}
          title={t("tests.addQuestion")}
        />
        <div className="question-form-list">
          <div className="question-form">
            <div className="type-points">
              <label className="type-points-label">
                <p>{t("tests.questionType")}</p>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="type-select"
                >
                  <option value="single_choice">
                    {t("tests.singleChoice")}
                  </option>
                  <option value="multiple_choice">
                    {t("tests.multipleChoice")}
                  </option>
                  <option value="short_text">{t("tests.shortAnswer")}</option>
                  <option value="long_text">{t("tests.longAnswer")}</option>
                </select>
              </label>

              <label>
                {t("tests.points")}
                <input
                  type="number"
                  min="1"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div className="options-section">
              <h4>{t("tests.options")}</h4>

              {(questionType === "single_choice" ||
                questionType === "multiple_choice") && (
                <div className="options-edit">
                  {options.map((opt, idx) => (
                    <div key={idx} className="option-item-edit">
                      <input
                        type="text"
                        placeholder={`${t("tests.optionsInput")} ${idx + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(idx, e.target.value)}
                      />
                      <label>
                        <input
                          type="checkbox"
                          checked={correctAnswers[idx]}
                          onChange={() => toggleCorrect(idx)}
                          className="answer-checkbox"
                        />
                      </label>
                    </div>
                  ))}
                  <button type="button" onClick={addOption}>
                    {t("tests.addOption")} +
                  </button>
                </div>
              )}

              {(questionType === "short_text" ||
                questionType === "long_text") && (
                <div className="text-answers">
                  {options.map((opt, idx) => (
                    <div key={idx} className="answer-item">
                      <input
                        type="text"
                        placeholder={`${t("tests.correctAnswers")} ${idx + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(idx, e.target.value)}
                      />
                      <label>
                        <input
                          type="checkbox"
                          checked={correctAnswers[idx]}
                          onChange={() => toggleCorrect(idx)}
                          className="answer-checkbox"
                        />
                        {t("tests.caseInsensitive")}
                      </label>
                    </div>
                  ))}
                  <button type="button" onClick={addOption}>
                    {t("tests.addAnswer")}
                  </button>
                </div>
              )}

              <button onClick={handleAddQuestion} className="add-question-btn">
                {t("tests.addQuestion")}
              </button>
            </div>
          </div>

          <div className="questions-list">
            <h3>
              {t("tests.questions")} ({questions.length})
            </h3>
            <div className="questions-table">
              {questions.map((q) => (
                <div key={q.id} className="question-item">
                  <h4>{q.question_text}</h4>
                  <p className="question-type">{q.question_type}</p>
                  <span className="points">{q.points} b.</span>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="btn-delete"
                  >
                    {t("tests.deleteBtn")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
