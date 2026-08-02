import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api";
import { useWorkspace } from "../../hooks/useWorkspace";
import "./Settings.css";

function Settings() {
  const { refreshUser } = useWorkspace();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setProfileError("");
    setProfileSuccess("");
    setPasswordError("");
    setPasswordSuccess("");
  }, [activeTab]);

  const loadUser = async () => {
    try {
      const response = await fetchWithAuth("/auth/me");
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setName(data.user.name || "");
        setSurname(data.user.surname || "");
        setBio(data.user.bio || "");
        setPhone(data.user.phone || "");
        setEmail(data.user.email || "");
        setCountry(data.user.country || "");
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);
    try {
      const response = await fetchWithAuth("/settings/update-profile", {
        method: "PUT",
        body: JSON.stringify({ name, surname, country, phone, bio, email }),
      });

      const data = await response.json();
      if (response.ok) {
        setProfileSuccess("Profile updated successfully");
        setUser(data.user);
        await refreshUser();
      } else {
        setProfileError(data.message || "Failed to update profile");
      }
    } catch (error) {
      setProfileError("Failed to update profile: " + error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  // const handleUpdateEmail = async (e) => {
  //   e.preventDefault();
  //   setEmailError("");
  //   setEmailSuccess("");
  //   setEmailLoading(true);
  //   try {
  //     const response = await fetchWithAuth("/settings/update-email", {
  //       method: "PUT",
  //       body: JSON.stringify({ email }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setEmailSuccess("Email changed successfully");
  //       setUser(data.user);
  //     } else {
  //       setEmailError(data.message || "Failed to change email");
  //     }
  //   } catch (error) {
  //     setEmailError("Failed to change email: " + error.message);
  //   } finally {
  //     setEmailLoading(false);
  //   }
  // };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordLoading(true);

    try {
      const response = await fetchWithAuth("/settings/update-password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setPasswordSuccess("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(data.message || "Failed to change password");
      }
    } catch (error) {
      setPasswordError("Failed to change password: " + error.message);
    } finally {
      setPasswordLoading(false);
    }
  };
  return (
    <div className="settings">
      <div className="setting-menu">
        <h1>Settings</h1>
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
          Profile
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
          Contact
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
          Security
        </button>
      </div>
      <div className="settings-content">
        {activeTab === "profile" && (
          <section>
            <h2>Profile</h2>
            <form onSubmit={handleUpdateProfile} className="settings-form">
              <div className="profile-header">
                <img src="/img/no_pp.jpg" alt="" />
                {user && (
                  <div className="profile-info">
                    <h3>
                      {user.name || "Name"} {user.surname || "Surname"}
                    </h3>
                    <p>{user.email}</p>
                  </div>
                )}
              </div>
              <div className="name-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={profileLoading}
                />
                <input
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  disabled={profileLoading}
                />
              </div>
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={profileLoading}
              />
              <div>
                <button type="submit" disabled={profileLoading}>
                  {profileLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
              {profileError && (
                <p style={{ color: "#971b1b", padding: "10px" }}>
                  {profileError}
                </p>
              )}
              {profileSuccess && (
                <p
                  style={{
                    color: "#22c55e",
                    padding: "10px",
                  }}
                >
                  {profileSuccess}
                </p>
              )}
            </form>
          </section>
        )}
        {activeTab === "contact" && (
          <section>
            <h2>Contact</h2>
            <form onSubmit={handleUpdateProfile} className="settings-form">
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={profileLoading}
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={profileLoading}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={profileLoading}
              />
              <div>
                <button type="submit" disabled={profileLoading}>
                  {profileLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
              {profileError && (
                <p style={{ color: "#971b1b", padding: "10px" }}>
                  {profileError}
                </p>
              )}
              {profileSuccess && (
                <p
                  style={{
                    color: "#22c55e",
                    padding: "10px",
                  }}
                >
                  {profileSuccess}
                </p>
              )}
            </form>
            {/* <form onSubmit={handleUpdateEmail}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailLoading}
              />
              <button type="submit" disabled={emailLoading}>
                {emailLoading ? "Updating..." : "Update Email"}
              </button>
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              {emailSuccess && <p style={{ color: "green" }}>{emailSuccess}</p>}
            </form> */}
          </section>
        )}
        {activeTab === "security" && (
          <section>
            <h2>Security</h2>
            <form onSubmit={handleUpdatePassword} className="settings-form">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={passwordLoading}
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={passwordLoading}
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={passwordLoading}
              />
              <div>
                <button type="submit" disabled={passwordLoading}>
                  {passwordLoading ? "Updating..." : "Update password"}
                </button>
              </div>
              {passwordError && (
                <p style={{ color: "#971b1b", padding: "10px" }}>
                  {passwordError}
                </p>
              )}
              {passwordSuccess && (
                <p
                  style={{
                    color: "#22c55e",
                    padding: "10px",
                  }}
                >
                  {passwordSuccess}
                </p>
              )}
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
export default Settings;
