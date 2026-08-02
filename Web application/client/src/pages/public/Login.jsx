import { useState } from "react";
import { useTranslation } from "react-i18next";
import { login } from "../../services/authService";
import "./Login.css";

export default function Login({ setIsAuth }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      await login(formData.email, formData.password);
      setIsAuth(true);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{t("public.loginTitle")}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder={t("common.email")}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder={t("common.password")}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? t("common.loggingIn") : t("common.login")}
          </button>
        </form>

        <p className="register-link">
          {t("common.dontHaveAccount")}{" "}
          <a href="/register">{t("common.register")}</a>
        </p>
      </div>
    </div>
  );
}
