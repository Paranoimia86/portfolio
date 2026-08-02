import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";

function ProtectedRoute({ children }) {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
