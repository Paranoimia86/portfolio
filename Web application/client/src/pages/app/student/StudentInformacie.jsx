import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./StudentInformacie.css";

export default function StudentPrednasky() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState("");
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    loadLectureContent();
  }, [i18n.language]);

  const loadLectureContent = async () => {
    setLoading(true);
    setError("");
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

      if (!response.ok) {
        throw new Error("Failed to load informations");
      }

      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error("Error loading informations:", error);
      setError("Nepodarilo sa načítať informácie");
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [index]: !prev[index],
    }));
  };

  const parts = content.split(/^## /m);
  const description = parts[0];
  const sections = parts.slice(1).map((section, i) => {
    const lines = section.split("\n");
    const title = lines[0];
    const body = lines.slice(1).join("\n");
    return { title, body };
  });

  return (
    <div className="student-informations">
      {description && (
        <div className="description">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {description}
          </ReactMarkdown>
        </div>
      )}
      <div className="sections">
        {sections.map((section, i) => (
          <div key={i} className="information-element">
            <button
              onClick={() => toggleSection(i)}
              className={`information-btn ${expandedSections[i] ? "information-btn-active" : ""}`}
            >
              {section.title}
              {expandedSections[i] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              )}{" "}
            </button>
            {expandedSections[i] && (
              <div className="section-content">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {section.body}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
