import { useTranslation } from "react-i18next";
import "./Home.css";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <h1>{t("public.welcome")}</h1>
      <p>{t("public.homeTitle")}</p>
    </div>
  );
}
