import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EditPanel from "../../components/EditPanel";

export default function ProfessorInformacie() {
  const { week } = useParams();
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setSaved] = useState(false);

  useEffect(() => {
    loadInformationsContent();
  }, [i18n.language]);

  const loadInformationsContent = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `/api/professor/get-information-content?language=${i18n.language}`,
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
      console.error("Error loading informations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("/api/professor/save-informations", {
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
      console.error("Error saving informations:", error);
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
        />
      )}
    </div>
  );
}
