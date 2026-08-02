import { useTranslation } from "react-i18next";
import "./StudentDashboard.css";

export default function StudentDashBoard() {
  const { t } = useTranslation();

  return (
    <div className="student-dashboard">
      <h1>{t("public.welcome")}</h1>
      <p>{t("public.homeTitle")}</p>
    </div>
  );
}
