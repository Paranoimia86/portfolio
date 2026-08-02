import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/public/Home";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import { isAuthenticated } from "./services/authService";
import StudentDashBoard from "./pages/app/student/StudentDashboard";
import ProfessorDashBoard from "./pages/app/professor/ProfessorDashBoard";
import AdminDashBoard from "./pages/app/admin/AdminDashBoard";
import StudentPrednasky from "./pages/app/student/StudentPrednasky";
import StudentCvicenia from "./pages/app/student/StudentCvicenia";
import StudentZadania from "./pages/app/student/StudentZadania";
import StudentTesty from "./pages/app/student/StudentTesty";
import StudentTestyZoznam from "./pages/app/student/StudentTestyZoznam";
import StudentInformacie from "./pages/app/student/StudentInformacie";
import StudentNastavenia from "./pages/app/student/StudentNastavenia";
import ProfessorNastavenia from "./pages/app/professor/ProfessorNastavenia";

import ProfessorStudentiZoznam from "./pages/app/professor/ProfessorStudentiZoznam";
import ProfessorStudent from "./pages/app/professor/ProfessorStudent";
import ProfessorPrednasky from "./pages/app/professor/ProfessorPrednasky";
import ProfessorCvicenia from "./pages/app/professor/ProfessorCvicenia";
import ProfessorZadania from "./pages/app/professor/ProfessorZadania";
import ProfessorTesty from "./pages/app/professor/ProfessorTesty";
import ProfessorInformacie from "./pages/app/professor/ProfessorInformacie";
import ProfessorPrednaskyZoznam from "./pages/app/professor/ProfessorPrednaskyZoznam";
import ProfessorCviceniaZoznam from "./pages/app/professor/ProfessorCviceniaZoznam";
import ProfessorZadaniaZoznam from "./pages/app/professor/ProfessorZadaniaZoznam";
import ProfessorTestyZoznam from "./pages/app/professor/ProfessorTestyZoznam";
import Layout from "./pages/components/Layout";

function App() {
  const [isAuth, setIsAuth] = useState(() => isAuthenticated());
  const userRole = isAuth ? localStorage.getItem("userRole") : null;

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getDashboard = () => {
    switch (userRole) {
      case "student":
        return <StudentDashBoard />;
      case "professor":
        return <ProfessorDashBoard />;
      case "admin":
        return <AdminDashBoard />;
      default:
        return <div>Unknown Role</div>;
    }
  };

  return (
    <Router>
      <Layout
        key={`${isAuth}-${userRole}`}
        isAuth={isAuth}
        userRole={userRole}
        setIsAuth={setIsAuth}
      >
        <Routes>

          <Route path="/" element={<Home />} />


          <Route
            path="/register"
            element={<Register setIsAuth={setIsAuth} />}
          />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />


          <Route
            path="/dashboard"
            element={<ProtectedRoute>{getDashboard()}</ProtectedRoute>}
          />
          <Route path="/student/zadania/:week" element={<StudentZadania />} />
          <Route
            path="/student/prednasky/:week"
            element={<StudentPrednasky />}
          />
          <Route path="/student/cvicenia/:week" element={<StudentCvicenia />} />
          <Route path="/student/testy" element={<StudentTestyZoznam />} />
          <Route path="/student/testy/:id" element={<StudentTesty />} />
          <Route path="/student/informacie" element={<StudentInformacie />} />
          <Route path="/student/nastavenia" element={<StudentNastavenia />} />

          <Route
            path="/professor/studenti"
            element={<ProfessorStudentiZoznam />}
          />
          <Route
            path="/professor/studenti/:id"
            element={<ProfessorStudent />}
          />
          <Route
            path="/professor/prednasky"
            element={
              <ProtectedRoute>
                <ProfessorPrednaskyZoznam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/professor/prednasky/:week"
            element={
              <ProtectedRoute>
                <ProfessorPrednasky />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor/cvicenia"
            element={
              <ProtectedRoute>
                <ProfessorCviceniaZoznam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor/cvicenia/:week"
            element={<ProfessorCvicenia />}
          />

          <Route
            path="/professor/zadania"
            element={
              <ProtectedRoute>
                <ProfessorZadaniaZoznam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/professor/zadania/:week"
            element={<ProfessorZadania />}
          />
          <Route
            path="/professor/testy"
            element={
              <ProtectedRoute>
                <ProfessorTestyZoznam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor/testy/:id"
            element={
              <ProtectedRoute>
                <ProfessorTesty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/professor/informacie"
            element={<ProfessorInformacie />}
          />
          <Route
            path="/professor/nastavenia"
            element={<ProfessorNastavenia />}
          />

          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
