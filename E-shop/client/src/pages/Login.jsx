import { useLocation, useNavigate } from "react-router-dom";
import { authLogin } from "../services/api";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const result = await authLogin({ email, password });
    if (result && result.accessToken) {
      const isAdmin = result.user?.role === "admin";
      navigate(isAdmin ? "/admin" : redirect, { replace: true });
    } else {
      alert(result?.message || t("loginFailed"));
    }
  };

  return (
    <section className="login-page">
      <h1>{t("login")}</h1>
      <form onSubmit={submit} className="login-form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password")}
          type="password"
        />
        <button type="submit">{t("login")}</button>
      </form>
    </section>
  );
}
