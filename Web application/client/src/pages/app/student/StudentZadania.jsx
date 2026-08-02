import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./StudentZadania.css";

export default function StudentZadania() {
  const { week } = useParams();
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAssigmentContent();
  }, [week, i18n.language]);

  const loadAssigmentContent = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `/api/professor/get-assigment-content?week=${week}&language=${i18n.language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load lecture");
      }

      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error("Error loading lecture:", error);
      setError(t("student.assignmentLoadError"));
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  const extractTree = (markdown) => {
    const match = markdown.match(
      /<div[^>]*white-space:\s*pre[^>]*>([\s\S]*?)<\/div>/,
    );
    return match ? match[1].trim() : null;
  };
  const treeRaw = extractTree(content);
  const withoutTree = content.replace(
    /<div[^>]*white-space:\s*pre[^>]*>[\s\S]*?<\/div>/,
    "",
  );
  return (
    <div className="student-assignment-view">
      <p className="assignment-week">
        {t("student.week")} {week}
      </p>
      {loading && <p>{t("common.loading")}</p>}
      {error && <p>{error}</p>}
      {content && (
        <>
          <div className="assignment-content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {withoutTree}
            </ReactMarkdown>
          </div>
          {treeRaw && <pre className="tree">{treeRaw}</pre>}
        </>
      )}
    </div>
  );
}
