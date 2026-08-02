import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");
  const [, setErrors] = useState({});
  const [currentError, setCurrentError] = useState("");
  const [currentErrorField, setCurrentErrorField] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) return "Email je povinný";
    if (!/\S+@\S+\.\S+/.test(value)) return "Neplatný formát emailu";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Heslo je povinné";
    if (value.length < 6) return "Heslo musí obsahovat aspoň 6 znakov";
    return "";
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Musíte opätovne potvrdiť heslo";
    if (value !== password) return "Nezhoda hesiel";
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

    if (confirmPassword) {
      const confirmError = value !== confirmPassword ? "Nezhoda hesiel" : "";
      setFieldValidation("confirmPassword", confirmError);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setError("");
    const fieldError = validateConfirmPassword(value);
    setFieldValidation("confirmPassword", fieldError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    const firstErrorField = emailError
      ? "email"
      : passwordError
        ? "password"
        : confirmPasswordError
          ? "confirmPassword"
          : "";
    const firstErrorMessage =
      emailError || passwordError || confirmPasswordError;

    if (firstErrorMessage) {
      setCurrentErrorField(firstErrorField);
      setCurrentError(firstErrorMessage);
    } else {
      setCurrentErrorField("");
      setCurrentError("");
    }

    if (emailError || passwordError || confirmPasswordError) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, workspaceName }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Registrácia zlyhala: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <img src="/img/register-img.png" alt="" />
      </div>
      <div className="register-right">
        <h1>Welcome!</h1>
        <p>
          Use these awesome forms to login or create new account in your project
          for free.
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <label className="register-label">
            Email
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => {
                const fieldError = validateEmail(email);
                setFieldValidation("email", fieldError);
              }}
              disabled={loading}
            />
          </label>

          <label className="register-label">
            Workspace Name (optional)
            <input
              type="text"
              placeholder="My Workspace"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              disabled={loading}
            />
          </label>
          <label className="register-label">
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

          <label className="register-label">
            Repeat password
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => {
                const fieldError = validateConfirmPassword(confirmPassword);
                setFieldValidation("confirmPassword", fieldError);
              }}
              disabled={loading}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </button>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currentError && <p style={{ color: "red" }}>{currentError}</p>}
      </div>
    </div>
  );
}
export default Register;
