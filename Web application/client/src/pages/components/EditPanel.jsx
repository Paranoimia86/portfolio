import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./EditPanel.css";

export default function EditPanel({ content, onChange, onSave }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedTextColor, setSelectedTextColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [history, setHistory] = useState([content]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lastSavedContent] = useState(content);
  const [showConfirm, setShowConfirm] = useState(false);

  const applyStyle = (styleProperty, styleValue) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    if (!selectedText) {
      alert(t("editor.selectText"));
      return;
    }

    const tag = styleProperty === "text-align" ? "div" : "span";

    const newText =
      text.substring(0, start) +
      `<${tag} style="${styleProperty}: ${styleValue}">` +
      selectedText +
      `</${tag}>` +
      text.substring(end);

    handleChange(newText);
  };

  const handleChange = (newContent) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    onChange(newContent);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const confirmCancel = () => {
    onChange(lastSavedContent);
    setHistory([lastSavedContent]);
    setHistoryIndex(0);
    setShowConfirm(false);
    navigate(-1);
  };

  const getBackgroundColor = () => {
    if (location.pathname.includes("/prednasky")) return "#425974";
    if (location.pathname.includes("/cvicenia")) return "#2F3945";
    if (location.pathname.includes("/zadania")) return "#5F7195";
    if (location.pathname.includes("/informacie")) return "#21223B";
    return "#ffffff";
  };

  const getTextColor = () => {
    if (/\/testy\/\d+/.test(location.pathname)) return "#000000";
    return "#ffffff";
  };

  const getTextareaStyle = () => {
    if (/\/testy\/\d+/.test(location.pathname)) return { height: "20vh" };
    return { height: "80vh" };
  };

  return (
    <div className="edit-panel">
      <div className="editor-toolbar">
        <div className="edit-font">
          <select
            value={selectedFont}
            onChange={(e) => {
              setSelectedFont(e.target.value);
              applyStyle("font-family", e.target.value);
            }}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Consolas">Consolas</option>
            <option value="Garamond">Garamond</option>
          </select>
        </div>
        <div className="edit-text">
          <input
            type="color"
            value={selectedTextColor}
            onChange={(e) => {
              setSelectedTextColor(e.target.value);
              applyStyle("color", e.target.value);
            }}
            title={t("editor.textColor")}
          />

          <button
            onClick={() => {
              const newBold = !isBold;
              setIsBold(newBold);
              applyStyle("font-weight", newBold ? "bold" : "normal");
            }}
            className="tool-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-type-bold"
              viewBox="0 0 16 16"
            >
              <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
            </svg>
          </button>

          <button
            onClick={() => {
              const newItalic = !isItalic;
              setIsItalic(newItalic);
              applyStyle("font-style", newItalic ? "italic" : "normal");
            }}
            className="tool-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-type-italic"
              viewBox="0 0 16 16"
            >
              <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
            </svg>
          </button>

          <button
            onClick={() => {
              const newUnderline = !isUnderline;
              setIsUnderline(newUnderline);
              applyStyle(
                "text-decoration",
                newUnderline ? "underline" : "none",
              );
            }}
            className="tool-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-type-underline"
              viewBox="0 0 16 16"
            >
              <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z" />
            </svg>
          </button>
        </div>
        <div className="edit-align">
          <button
            onClick={() => applyStyle("text-align", "left")}
            className="tool-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-text-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <button
            onClick={() => applyStyle("text-align", "center")}
            className="tool-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-text-center"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <button
            onClick={() => applyStyle("text-align", "right")}
            className="tool-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-text-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <button
            onClick={() => applyStyle("text-align", "justify")}
            className="tool-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-justify"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </div>
        <div className="edit-actions">
          <button
            onClick={handleUndo}
            className="tool-btn"
            disabled={historyIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-90deg-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z"
              />
            </svg>
          </button>
          <button
            onClick={handleRedo}
            className="tool-btn"
            disabled={historyIndex === history.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-90deg-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-floppy-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
              <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
            </svg>
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={content || ""}
        onChange={(e) => handleChange(e.target.value)}
        rows={20}
        cols={80}
        style={{
          backgroundColor: getBackgroundColor(),
          color: getTextColor(),
          height: getTextareaStyle().height,
        }}
        placeholder={t("editor.placeholder")}
      />

      {showConfirm && (
        <div className="confirm-window">
          <div className="confirm-content">
            <button onClick={() => setShowConfirm(false)} className="close-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
              </svg>
            </button>
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
              <h3>{t("editor.unsavedChanges")}</h3>
              <p>{t("editor.saveOrCancel")}</p>
            </div>
            <div className="confirm-actions">
              <button
                onClick={() => {
                  onSave();
                  setShowConfirm(false);
                  navigate(-1);
                }}
                className="save-btn"
              >
                {t("editor.saveAndClose")}
              </button>
              <button onClick={confirmCancel} className="cancel-btn">
                {t("editor.discardChanges")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
