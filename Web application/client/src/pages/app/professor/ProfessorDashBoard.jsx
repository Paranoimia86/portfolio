import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import { useState, useEffect, useCallback } from "react";
import "./ProfessorDashBoard.css";

export default function ProfessorDashBoard() {
  const { t } = useTranslation();
  const [userName, setUserName] = useState(null);

  const loadUserInfo = useCallback(async () => {
    try {
      const response = await apiCallWithAuth("/users/profile");
      if (response.ok) {
        const data = await response.json();
        setUserName(`${data.first_name} ${data.last_name}`);
      }
    } catch (error) {
      console.error("Failed to load user info:", error);
    }
  }, []);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  return (
    <div className="professor-dashboard">
      <h1>
        {t("professor.dashboard")} {userName}
      </h1>
      <img src="../../../../public/img/Pozadie-prof.png" alt="" />
    </div>
  );
}
