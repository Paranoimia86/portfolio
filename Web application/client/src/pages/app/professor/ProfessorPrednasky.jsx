import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EditPanel from "../../components/EditPanel";

export default function ProfessorPrednasky() {
  const { week } = useParams();
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setSaved] = useState(false);

  useEffect(() => {
    loadLectureContent();
  }, [week, i18n.language]);

  const loadLectureContent = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `/api/professor/get-lecture-content?week=${week}&language=${i18n.language}`,
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
      console.error("Error loading lecture:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("/api/professor/save-lecture", {
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
      console.error("Error saving lecture:", error);
    }
  };

  return (
    <div className="professor-lecture-edit">
      {loading ? (
        <p>{t("tests.loading")}</p>
      ) : (
        <EditPanel
          content={content}
          onChange={setContent}
          onSave={handleSave}
          title={`${t("professor.week")} ${week}`}
        />
      )}
    </div>
  );
}
