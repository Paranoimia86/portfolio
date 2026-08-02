import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/app/Dashboard";
import Login from "./pages/public/Login";
import ProtectedRoute from "./pages/components/ProtectRoute";
import PublicRoute from "./pages/components/PublicRoute";
import Navbar from "./pages/components/Navbar";
import UserBar from "./pages/components/UserBar";
import Profile from "./pages/app/Profile";
import Settings from "./pages/app/Settings";
import Projects from "./pages/app/Projects";
import Register from "./pages/public/Register";
import Members from "./pages/app/Members";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import { useWorkspace } from "./hooks/useWorkspace";

function ProtectedLayout() {
  const { user, activeWorkspace, refreshUser } = useWorkspace();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser();
  }, [activeWorkspace]);

  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-main">
        <UserBar
          userName={user?.name}
          userEmail={user?.email}
          onProfileClick={() => navigate("/profile")}
          onSettingClick={() => navigate("/settings")}
        />
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <WorkspaceProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/members" element={<Members />} />
          </Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </WorkspaceProvider>
    </BrowserRouter>
  );
}

export default App;
