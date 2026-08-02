import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
export default PublicRoute;
