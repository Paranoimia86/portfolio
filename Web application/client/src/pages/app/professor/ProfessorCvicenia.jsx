import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EditPanel from "../../components/EditPanel";

export default function ProfessorCvicenia() {
  const { week } = useParams();
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setSaved] = useState(false);

  useEffect(() => {
    loadExerciseContent();
  }, [week, i18n.language]);

  const loadExerciseContent = async () => {
    setLoading(true);
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

      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
      }
    } catch (error) {
      console.error("Error loading exercise:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("/api/professor/save-exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          week,
          language: i18n.language,
          content,
        }),
      });

      if (response.ok) {
        setSaved(true);
      }
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };
  return (
    <div>
      {loading ? (
        <p>{t("tests.loading")}</p>
      ) : (
        <EditPanel
          content={content}
          onChange={setContent}
          onSave={handleSave}
          title={`${t("professor.edit")} ${t("professor.week")} ${week}`}
        />
      )}
    </div>
  );
}
