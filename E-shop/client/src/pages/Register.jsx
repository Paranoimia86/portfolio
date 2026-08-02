import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRegister } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    const result = await authRegister({
      name: form.name,
      surname: form.surname,
      email: form.email,
      password: form.password,
    });

    if (result?.accessToken) {
      navigate("/");
      return;
    }

    setError(result?.message || t("registrationFailed"));
  };

  return (
    <section className="register-page">
      <h1>{t("registerPage")}</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t("firstName")}
          required
        />
        <input
          name="surname"
          value={form.surname}
          onChange={handleChange}
          placeholder={t("lastName")}
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("email")}
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder={t("password")}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder={t("repeatPassword")}
          required
        />

        {error && <p>{error}</p>}

        <button type="submit">{t("registerButton")}</button>
      </form>
    </section>
  );
}
