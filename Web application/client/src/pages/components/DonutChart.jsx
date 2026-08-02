import { useTranslation } from "react-i18next";
import "./DonutChart.css";

const DonutChart = ({ value, max, label, color = "#00ff00" }) => {
  const { t } = useTranslation();
  const percent = max > 0 ? value / max : 0;
  const radius = 60;
  const stroke = 16;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - percent);

  return (
    <div className="donut-chart">
      <p className="donut-chart-label">{label}</p>
      <div
        className="donut-chart-svg-wrapper"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        <svg width={radius * 2} height={radius * 2}>
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="transparent"
            stroke="#222"
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="transparent"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius} ${radius})`}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="donut-chart-text">
          {value}/{max}
        </div>
      </div>
      <div className="donut-chart-legend">
        <div className="donut-chart-legend-item">
          <div
            className="donut-chart-legend-dot"
            style={{ backgroundColor: color }}
          />
          <span>{t("professor.earnedPoints")}</span>
        </div>
        <div className="donut-chart-legend-item">
          <div
            className="donut-chart-legend-dot"
            style={{ backgroundColor: "#222" }}
          />
          <span>{t("professor.remainingPoints")}</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
