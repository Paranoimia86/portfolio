import { useTranslation } from "react-i18next";
import "./LectureCards.css";

const COLORS = [
  "#E6F4FF",
  "#BAE0FF",
  "#91CAFF",
  "#69B1FF",
  "#4096FF",
  "#1677FF",
  "#0958D9",
  "#434343",
  "#303030",
  "#262626",
  "#1F1F1F",
  "#141414",
  "#0A0A0A",
];

const TEXT_COLORS = [
  "#000",
  "#000",
  "#000",
  "#000",
  "#000",
  "#fff",
  "#fff",
  "#fff",
  "#fff",
  "#fff",
  "#fff",
  "#fff",
  "#fff",
];

const LectureCards = ({ lectureStats }) => {
  const { t } = useTranslation();

  const formatTime = (seconds) => {
    if (!seconds) return "0 min";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="lc-cards">
      {Array.from({ length: 13 }).map((_, i) => {
        const stat = lectureStats.find((s) => s.lecture_number === i + 1);
        return (
          <div
            key={i}
            className="lc-card"
            style={{ backgroundColor: COLORS[i], color: TEXT_COLORS[i] }}
          >
            <p className="lc-card-title">
              {i + 1}. {t("professor.lecture")}
            </p>
            <div className="lc-card-stats">
              <span>
                <strong>{t("professor.visits")}: </strong>
                {stat?.views ?? 0}
              </span>
              <span>
                <strong>{t("professor.totalTime")}: </strong>
                {formatTime(stat?.total_seconds)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LectureCards;
