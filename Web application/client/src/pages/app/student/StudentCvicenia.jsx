import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./StudentCvicenia.css";

export default function StudentCvicenia() {
  const { week } = useParams();
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWeekContent(week);
  }, [week, i18n.language]);

  const loadWeekContent = async (weekNumber) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `/api/professor/get-exercise-content?week=${week}&language=${i18n.language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load exercise content");
      }
      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error(`Error loading week ${weekNumber} content:`, error);
      setContent("");
      setError(t("student.exerciseLoadError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-exercise-view">
      <p className="exercise-week">
        {t("student.week")} {week}
      </p>
      {loading && <p>{t("common.loading")}</p>}
      {error && <p>{error}</p>}
      {content && (
        <div className="exercise-content">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
