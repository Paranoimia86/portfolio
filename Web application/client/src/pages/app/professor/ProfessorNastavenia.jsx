import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiCallWithAuth } from "../../../utils/api";
import "./ProfessorNastavenia.css";

export default function ProfessorNastavenia() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_photo: "",
  });

  const [groups, setGroups] = useState([]);
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
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const profileResponse = await apiCallWithAuth("/users/profile");
      if (!profileResponse.ok) throw new Error("Failed to load profile");
      const profileData = await profileResponse.json();
      setProfile(profileData);
      if (profileData.profile_photo) {
        setPhotoPreview(profileData.profile_photo);
      }

      const groupsResponse = await apiCallWithAuth("/users/professor/groups");
      if (!groupsResponse.ok) throw new Error("Failed to load groups");
      const groupsData = await groupsResponse.json();
      setGroups(groupsData);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  const handleRemoveFromGroup = async (groupId) => {
    if (!window.confirm(t("professor.confirmRemoveGroup"))) {
      return;
    }

    try {
      const response = await apiCallWithAuth(
        `/users/professor/groups/${groupId}/leave`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove from group");
      }

      setGroups(groups.filter((g) => g.id !== groupId));
      setSuccess(t("professor.removedFromGroup"));
      setTimeout(() => setSuccess(null), 3000);
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
        setError(t("common.allFieldsRequired"));
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

  if (loading) {
    return <div style={{ padding: "20px" }}>{t("common.loading")}</div>;
  }

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
            {t("professor.profile")}
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={activeTab === "groups" ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-collection-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1" />
            </svg>
            {t("professor.groups")}
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
            {t("professor.security")}
          </button>
        </div>
        <div className="setting-content">
          {error && (
            <div
              style={{
                color: "red",
                marginBottom: "20px",
                padding: "10px",
                backgroundColor: "#ffe0e0",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: "green",
                marginBottom: "20px",
                padding: "10px",
                backgroundColor: "#e0ffe0",
                borderRadius: "4px",
              }}
            >
              {success}
            </div>
          )}

          {activeTab === "profile" && (
            <section>
              <h3>{t("professor.profileInfo")}</h3>

              {photoPreview && (
                <div style={{ marginBottom: "15px" }}>
                  <img src={photoPreview} alt="Preview" />
                </div>
              )}

              <div style={{ marginBottom: "15px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  style={{
                    marginBottom: "10px",
                    display: "block",
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
              </div>
            </section>
          )}

          {activeTab === "groups" && (
            <section>
              <h3>{t("professor.myGroups")}</h3>

              {groups.length === 0 ? (
                <p style={{ color: "#ffffffff" }}>
                  {t("professor.noGroupsAssigned")}
                </p>
              ) : (
                <div>
                  {groups.map((group) => (
                    <div className="group-list" key={group.id}>
                      <div className="one-group">
                        <p style={{ margin: "5px 0 5px 0" }}>
                          <strong>{group.day || "Bez dňa"}</strong>
                        </p>
                        <p>
                          {t("professor.studentGroupCount")}:{" "}
                          {group.student_count || 0}
                        </p>
                      </div>
                      <button onClick={() => handleRemoveFromGroup(group.id)}>
                        {t("professor.removeFromGroup")}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === "security" && (
            <section>
              <h3>{t("professor.changePassword")}</h3>

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

              <div style={{ marginBottom: "15px" }}>
                <label>{t("student.newPassword")}:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder={t("student.newPassword")}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
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
                {t("professor.changePassword")}
              </button>
            </section>
          )}

          <button
            onClick={() => navigate("/dashboard")}
            className="back-settings"
          >
            {t("professor.back")}
          </button>
        </div>
      </div>
    </div>
  );
}
