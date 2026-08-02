import { useLocation } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
import ProfessorNavbar from "../components/ProfessorNavbar";
import Userbar from "../components/Userbar";
import PublicUserbar from "../public/components/PublicUserbar";
import "./Layout.css";

export default function Layout({ isAuth, userRole, setIsAuth, children }) {
  const location = useLocation();
  const noScrollPages = ["/student/testy", "/dashboard"];
  const isNoScroll = noScrollPages.includes(location.pathname);

  const getNavbar = () => {
    switch (userRole) {
      case "student":
        return <StudentNavbar />;
      case "professor":
        return <ProfessorNavbar />;
      default:
        return null;
    }
  };

  const isTestTaking = location.pathname.match(/^\/student\/testy\/\d+$/);

  const showPublicUserbar =
    !isAuth && ["/", "/login", "/register"].includes(location.pathname);

  const showNavbar =
    isAuth &&
    !["/", "/login", "/register"].includes(location.pathname) &&
    userRole !== "admin" &&
    !isTestTaking;

  const showUserbar =
    isAuth &&
    !["/", "/login", "/register"].includes(location.pathname) &&
    !isTestTaking;

  if (isAuth && showNavbar) {
    return (
      <div className="layout-container">
        <header className="layout-header">
          {showUserbar && <Userbar setIsAuth={setIsAuth} />}
        </header>

        <aside className="layout-sidebar">{getNavbar()}</aside>
        <main className={`layout-main ${isNoScroll ? "no-scroll" : ""}`}>
          {children}
        </main>
      </div>
    );
  }
  return (
    <>
      {showNavbar && getNavbar()}
      {showUserbar && <Userbar setIsAuth={setIsAuth} />}
      {showPublicUserbar && <PublicUserbar />}
      {children}
    </>
  );
}
