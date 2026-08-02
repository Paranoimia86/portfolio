import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import "./Login.css";

function Login() {
  const { refreshWorkspaces } = useWorkspace();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setErrors] = useState({});
  const [currentError, setCurrentError] = useState("");
  const [currentErrorField, setCurrentErrorField] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) return "Email je povinný";
    if (!/\S+@\S+\.\S+/.test(value)) return "Neplatný formát Emailu";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Heslo je povinné";
    if (value.length < 6) return "Heslo musí obsahovať aspoň 6 znakov";
    return "";
  };

  const setFieldValidation = (field, fieldError) => {
    setErrors((prev) => ({ ...prev, [field]: fieldError }));

    if (fieldError) {
      setCurrentErrorField(field);
      setCurrentError(fieldError);
      return;
    }

    if (currentErrorField === field) {
      setCurrentErrorField("");
      setCurrentError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
    const fieldError = validateEmail(value);
    setFieldValidation("email", fieldError);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
    const fieldError = validatePassword(value);
    setFieldValidation("password", fieldError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({
      email: emailError,
      password: passwordError,
    });

    const firstErrorField = emailError
      ? "email"
      : passwordError
        ? "password"
        : "";
    const firstErrorMessage = emailError || passwordError;

    if (firstErrorMessage) {
      setCurrentErrorField(firstErrorField);
      setCurrentError(firstErrorMessage);
    } else {
      setCurrentErrorField("");
      setCurrentError("");
    }

    if (emailError || passwordError) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        window.dispatchEvent(new Event("auth-changed"));
        refreshWorkspaces();
        navigate("/dashboard");
      } else {
        setError(data.message || "Prihlásenie zlyhalo");
      }
    } catch (err) {
      setError("Prihlásenie zlyhalo: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/img/login-img.png" alt="" />
      </div>
      <div className="login-right">
        <h1>Nice to see you!</h1>
        <p>Enter your email and password to sign in</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Email
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => {
                const fieldError = validateEmail(email);
                setFieldValidation("email", fieldError);
              }}
              disabled={loading}
            />
          </label>
          <label className="login-label">
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => {
                const fieldError = validatePassword(password);
                setFieldValidation("password", fieldError);
              }}
              disabled={loading}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
          <p>
            Dont't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currentError && <p style={{ color: "red" }}>{currentError}</p>}
      </div>
    </div>
  );
}

export default Login;
