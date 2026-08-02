import { useLocation } from "react-router-dom";
import "./UserBar.css";

function UserBar({ userName, userEmail, onProfileClick, onSettingClick }) {
  const location = useLocation();
  const displayName = userName?.trim()
    ? userName
    : userEmail?.split("@")[0] || "Používateľ";

  const getPageName = () => {
    const path = location.pathname;
    const pathMap = {
      "/dashboard": "Dashboard",
      "/members": "Members",
      "/projects": "Projects",
      "/profile": "Profile",
      "/settings": "Settings",
    };
    return pathMap[path] || "Page";
  };

  return (
    <div className="user-bar">
      <div className="page-path">
        <span>
          Pages / <strong>{getPageName()}</strong>
        </span>
      </div>
      <div className="btns">
        <button
          type="button"
          className="user-bar-profile"
          onClick={onProfileClick}
          aria-label="Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="img"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <span>{displayName}</span>
        </button>
        <button
          type="button"
          className="user-bar-settings"
          onClick={onSettingClick}
          aria-label="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="img"
            viewBox="0 0 16 16"
          >
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default UserBar;
