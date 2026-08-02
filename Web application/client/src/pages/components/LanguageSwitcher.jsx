import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setShowDropdown(false);
  };

  const languages = [
    { code: "sk", name: "Slovenčina" },
    { code: "en", name: "English" },
  ];

  return (
    <div className="language-switcher">
      <button
        className="language-button"
        onClick={() => setShowDropdown(!showDropdown)}
        title="Zmeniť jazyk"
      >
        {i18n.language.toUpperCase()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="language-select-icon"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>
      {showDropdown && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${i18n.language === lang.code ? "active" : ""}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div
                className={`check-icon ${i18n.language === lang.code ? "active" : ""}`}
              ></div>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
