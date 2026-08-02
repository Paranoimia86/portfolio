import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost, apiPut } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [form, setForm] = useState(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) {
      return {
        name: "",
        surname: "",
        city: "",
        street: "",
        postal_code: "",
        phone: "",
      };
    }
    const user = JSON.parse(rawUser);
    return {
      name: user.name || "",
      surname: user.surname || "",
      city: user.city || "",
      street: user.street || "",
      postal_code: user.postal_code || "",
      phone: user.phone || "",
    };
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [paymentForm, setPaymentForm] = useState(() => {
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : {};
    return {
      bank_account: user.bank_account || "",
      card_holder: user.card_holder || "",
      card_number: "",
      card_expiry: user.card_expiry || "",
    };
  });
  const [cardLast4, setCardLast4] = useState(() => {
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : {};
    return user.card_last4 || "";
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((current) => ({ ...current, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await apiPut("/auth/update-profile", form);

    if (result?.success || result?.user) {
      localStorage.setItem("user", JSON.stringify(result.user || form));
      window.dispatchEvent(new Event("authchange"));
      setSuccess(t("profileSaved"));
    } else {
      setError(result?.message || "Aktualizácia zlyhala.");
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    const result = await apiPost("/auth/change-password", {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    if (result?.success) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSuccess(t("passwordSaved"));
    } else {
      setError(result?.message || "Zmena hesla zlyhala.");
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setPaymentError("");
    setPaymentSuccess("");

    const result = await apiPut("/auth/update-payment", paymentForm);

    if (result?.user) {
      const rawUser = localStorage.getItem("user");
      const currentUser = rawUser ? JSON.parse(rawUser) : {};
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, ...result.user }),
      );
      window.dispatchEvent(new Event("authchange"));
      setCardLast4(result.user.card_last4 || "");
      setPaymentForm((current) => ({ ...current, card_number: "" }));
      setPaymentSuccess(t("paymentDetailsSaved"));
    } else {
      setPaymentError(
        result?.message || "Aktualizácia platobných údajov zlyhala.",
      );
    }
  };

  return (
    <section>
      <h1>{t("profileSettings")}</h1>
      <div className="settings-page">
        <div className="profile-settings">
          <h2>{t("personalData")}</h2>
          <form onSubmit={handleSubmitProfile}>
            <div className="name-surname">
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
            </div>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder={t("city")}
            />
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder={t("street")}
            />
            <input
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              placeholder={t("postalCode")}
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t("phone")}
            />

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <button type="submit">{t("saveChanges")}</button>
          </form>
        </div>
        <div className="password-change">
          <h2>{t("changePassword")}</h2>
          <form onSubmit={handleSubmitPassword}>
            <input
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder={t("currentPassword")}
              required
            />
            <input
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder={t("newPassword")}
              required
            />
            <input
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder={t("confirmNewPassword")}
              required
            />

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <button type="submit">{t("changePasswordButton")}</button>
          </form>
        </div>

        <div className="payment-settings">
          <h2>{t("paymentDetails")}</h2>
          <form onSubmit={handleSubmitPayment}>
            <input
              name="bank_account"
              value={paymentForm.bank_account}
              onChange={handlePaymentChange}
              placeholder={t("bankAccount")}
              autoComplete="off"
            />
            <input
              name="card_holder"
              value={paymentForm.card_holder}
              onChange={handlePaymentChange}
              placeholder={t("cardHolder")}
              autoComplete="off"
            />
            <input
              name="card_number"
              value={paymentForm.card_number}
              onChange={handlePaymentChange}
              placeholder={
                cardLast4
                  ? `${t("cardNumber")} (•••• ${cardLast4})`
                  : t("cardNumber")
              }
              inputMode="numeric"
              autoComplete="off"
            />
            <input
              name="card_expiry"
              value={paymentForm.card_expiry}
              onChange={handlePaymentChange}
              placeholder={t("cardExpiry")}
              autoComplete="off"
            />

            {paymentError && <p>{paymentError}</p>}
            {paymentSuccess && <p>{paymentSuccess}</p>}
            <button type="submit">{t("saveChanges")}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
