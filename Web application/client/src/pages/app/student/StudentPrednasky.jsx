import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./StudentPrednasky.css";

export default function StudentPrednasky() {
  const { week } = useParams();
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lectureNumberRef = useRef(null);

  useEffect(() => {
    loadLectureContent();
  }, [week, i18n.language]);

  useEffect(() => {
    const trackLectureOpen = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`/api/lectures/${week}/track-open`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        lectureNumberRef.current = data.tracking_id;
      } catch (error) {
        console.error("Error tracking lecture open:", error);
      }
    };

    const trackLectureClose = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        await fetch(`/api/lectures/${week}/track-close`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error tracking lecture close:", error);
      }
    };

    trackLectureOpen();

    return () => {
      trackLectureClose();
    };
  }, [week]);

  const loadLectureContent = async () => {
    setLoading(true);
    setError("");
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

      if (!response.ok) {
        throw new Error("Failed to load lecture");
      }

      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error("Error loading lecture:", error);
      setError(t("student.loadingError"));
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-lecture-view">
      <p className="lecture-week">
        {t("student.week")} {week}
      </p>

      {loading && <p>{t("common.loading")}</p>}
      {error && <p>{error}</p>}
      {content && (
        <div className="lecture-content">
          <ReactMarkdown
            rehypePlugins={[[rehypeRaw, { passThrough: ["raw"] }]]}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
