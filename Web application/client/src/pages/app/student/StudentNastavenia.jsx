import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import "./StudentNastavenia.css";

export default function StudentNastavenia() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    student_id_number: "",
    address: "",
    date_of_birth: "",
    school: "",
    profile_photo: "",
  });

  const [formData, setFormData] = useState({
    student_id_number: "",
    address: "",
    date_of_birth: "",
    school: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await apiCallWithAuth("/users/profile");
      if (!response.ok) throw new Error("Failed to load profile");

      const data = await response.json();
      setProfile(data);
      setFormData({
        student_id_number: data.student_id_number || "",
        address: data.address || "",
        date_of_birth: data.date_of_birth || "",
        school: data.school || "",
      });

      if (data.profile_photo) {
        setPhotoPreview(data.profile_photo);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t("student.photoTooLarge"));
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          file.type,
        )
      ) {
        setError(t("student.photoInvalidType"));
        return;
      }

      setSelectedPhoto(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedPhoto) {
      setError(t("student.selectPhoto"));
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("photo", selectedPhoto);

      const token = localStorage.getItem("accessToken");
      const response = await fetch("/api/users/profile/upload-photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload photo");
      }

      const data = await response.json();
      setProfile((prev) => ({
        ...prev,
        profile_photo: data.profile_photo,
      }));
      setSelectedPhoto(null);
      setSuccess(t("student.photoUploadedSuccess"));
      setTimeout(() => setSuccess(null), 3000);

      window.dispatchEvent(
        new CustomEvent("photoUpdated", {
          detail: { photoPath: data.profile_photo },
        }),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (
        formData.student_id_number &&
        !/^S\d{10}$/.test(formData.student_id_number)
      ) {
        setError(t("student.studentNumberInvalid"));
        return;
      }

      if (formData.date_of_birth) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(formData.date_of_birth)) {
          setError(t("student.invalidDateFormat"));
          return;
        }
      }

      const response = await apiCallWithAuth("/users/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save profile");
      }

      const data = await response.json();
      setProfile(data);
      setSuccess(t("student.profileUpdatedSuccess"));
      setTimeout(() => setSuccess(null), 3000);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    try {
      if (
        !passwordData.oldPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {
        setError(t("student.allFieldsRequired"));
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError(t("student.passwordsNotMatch"));
        return;
      }

      if (passwordData.newPassword.length < 6) {
        setError(t("student.passwordTooShort"));
        return;
      }

      const response = await apiCallWithAuth("/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to change password");
      }

      setSuccess(t("student.passwordChangedSuccess"));
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(null), 3000);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>{t("common.loading")}</div>;

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>{t("student.mySettings")}</h1>
      </div>
      <div className="settings">
        <div className="settings-menu">
          <button
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            {t("student.profile")}
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={activeTab === "contact" ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-lines-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
            </svg>
            {t("student.contact")}
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={activeTab === "security" ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
              />
            </svg>
            {t("student.security")}
          </button>
        </div>
        <div className="setting-content">
          {error && (
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "15px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div
              style={{
                backgroundColor: "#d4edda",
                color: "#155724",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "15px",
              }}
            >
              ✓ {success}
            </div>
          )}

          {activeTab === "profile" && (
            <section>
              <h3>{t("student.profilePhoto")}</h3>
              {photoPreview && (
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                  <img src={photoPreview} alt="Preview" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                style={{
                  display: "block",
                  marginBottom: "10px",
                  border: "none",
                  paddingLeft: "0",
                  backgroundColor: "transparent",
                }}
              />
              <button
                onClick={handleUploadPhoto}
                disabled={!selectedPhoto}
                className={`upload-photo ${selectedPhoto ? "upload-photo-active" : "upload-photo-disabled"}`}
              >
                {t("student.uploadPhoto")}
              </button>
            </section>
          )}
          {activeTab === "contact" && (
            <section>
              <h3>{t("student.studentContact")}</h3>

              <div>
                <label>{t("student.studentNumber")}:</label>
                <input
                  type="text"
                  name="student_id_number"
                  value={formData.student_id_number}
                  onChange={handleInputChange}
                  placeholder="S0123456789"
                  maxLength="11"
                />
              </div>

              <div>
                <label>{t("student.address")}:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Napr. Ulica 123, Mesto"
                />
              </div>

              <div>
                <label>{t("student.dateOfBirth")}:</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>{t("student.school")}:</label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="Napr. TUKE"
                />
              </div>
            </section>
          )}
          {activeTab === "security" && (
            <section>
              <h3>{t("student.changePassword")}</h3>

              <div>
                <label>{t("student.oldPassword")}:</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder={t("student.oldPassword")}
                />
              </div>

              <div>
                <label>{t("student.newPassword")}:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder={t("student.newPassword")}
                />
              </div>

              <div>
                <label>{t("student.confirmPassword")}:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder={t("student.confirmPassword")}
                />
              </div>

              <button onClick={handleChangePassword} className="confirm-btn">
                {t("student.changePasswordBtn")}
              </button>
            </section>
          )}
          <div className="button-group">
            <button className="save-settings" onClick={handleSaveProfile}>
              {t("student.saveProfile")}
            </button>
            <button className="close-settings" onClick={() => navigate(-1)}>
              {t("common.close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
