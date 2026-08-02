import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { register } from "../../services/authService";
import { apiCall } from "../../utils/api";
import "./Register.css";

export default function Register({ setIsAuth }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    exerciseGroupId: "",
  });
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeHint, setActiveHint] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiCall("/group/groups");
        if (response.ok) {
          const data = await response.json();
          setGroups(data);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        setError(t("common.passwordsNotMatch"));
        setLoading(false);
        return;
      }

      const fullEmail = `${formData.email}@student.tuke.sk`;
      await register(
        formData.first_name,
        formData.last_name,
        fullEmail,
        formData.password,
        formData.exerciseGroupId,
      );
      setIsAuth(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>{t("public.registerTitle")}</h2>
        <div className="register-form-hints">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="register-form">
            <form onSubmit={handleSubmit} className="register-form-inner">
              <div className="name-fields">
                <input
                  type="text"
                  name="first_name"
                  className="name-input"
                  placeholder={t("common.firstName")}
                  value={formData.first_name}
                  onChange={handleChange}
                  onMouseEnter={() => setActiveHint("first_name")}
                  onMouseLeave={() => setActiveHint(null)}
                  required
                />

                <input
                  type="text"
                  name="last_name"
                  className="name-input"
                  placeholder={t("common.lastName")}
                  value={formData.last_name}
                  onChange={handleChange}
                  onMouseEnter={() => setActiveHint("last_name")}
                  onMouseLeave={() => setActiveHint(null)}
                  required
                />
              </div>

              <input
                type="text"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                onMouseEnter={() => setActiveHint("email")}
                onMouseLeave={() => setActiveHint(null)}
                placeholder={t("common.email")}
                required
              />

              <select
                name="exerciseGroupId"
                className="form-input"
                value={formData.exerciseGroupId}
                placeholder={t("common.selectGroup")}
                onChange={handleChange}
                onMouseEnter={() => setActiveHint("exerciseGroupId")}
                onMouseLeave={() => setActiveHint(null)}
                required
              >
                <option value="">{t("common.selectGroup")}</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.day} {group.time}
                  </option>
                ))}
              </select>

              <input
                type="password"
                name="password"
                className="form-input"
                placeholder={t("common.password")}
                value={formData.password}
                onChange={handleChange}
                onMouseEnter={() => setActiveHint("password")}
                onMouseLeave={() => setActiveHint(null)}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder={t("common.confirmPassword")}
                value={formData.confirmPassword}
                onChange={handleChange}
                onMouseEnter={() => setActiveHint("confirmPassword")}
                onMouseLeave={() => setActiveHint(null)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? t("common.registering") : t("common.register")}
              </button>
            </form>

            <p className="login-link">
              {t("common.alreadyHaveAccount")}{" "}
              <a href="/login">{t("common.login")}</a>
            </p>
          </div>
          <div className="register-hints">
            <img src="../../../../public/img/Register-img.jpg" alt="" />
            <div className="hints-text">
              {activeHint === "first_name" && (
                <p className="input-hint">
                  Zadajte vaše krstné meno, ak máte 2 mená, v tom prípade
                  zadajte iba to prvé
                </p>
              )}
              {activeHint === "last_name" && (
                <p className="input-hint">Zadajte vaše priezvisko</p>
              )}
              {activeHint === "email" && (
                <p className="input-hint">
                  Zadajte váš študentský e-mail bez domény (@student.tuke.sk sa
                  pridá automaticky)
                </p>
              )}
              {activeHint === "exerciseGroupId" && (
                <p className="input-hint">
                  Zvoľte si svoju skupinu, ktorú navštevujete
                </p>
              )}
              {activeHint === "password" && (
                <p className="password-hint">
                  Zadajte heslo, ktorým sa budete prihlasovať do systému
                  <p className="password-warning">Heslo nikomu neukazujte</p>
                </p>
              )}
              {activeHint === "confirmPassword" && (
                <p className="input-hint">Musí sa zhodovať s heslom vyššie</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
