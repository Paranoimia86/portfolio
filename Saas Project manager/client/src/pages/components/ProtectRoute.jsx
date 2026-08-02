import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const isAuttenticated = localStorage.getItem("accessToken") !== null;
  if (!isAuttenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
