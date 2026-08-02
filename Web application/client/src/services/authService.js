import { apiCall, apiCallWithAuth } from "../utils/api";
import { getUserRoleFromEmail } from "../utils/roleUtils";

export const register = async (
  first_name,
  last_name,
  email,
  password,
  exerciseGroupId,
) => {
  const body = { first_name, last_name, email, password };
  if (exerciseGroupId) {
    body.exercise_group_id = exerciseGroupId;
  }
  const response = await apiCall("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Register error:", error);
    throw new Error(error.message || "Registration failed");
  }

  const role = getUserRoleFromEmail(email);
  localStorage.setItem("userRole", role);

  return await response.json();
};

export const login = async (email, password) => {
  const response = await apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();
  if (data.accessToken && data.refreshToken) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    const role = getUserRoleFromEmail(data.user.email);
    localStorage.setItem("userRole", role);
  }
  return data;
};

export const logout = async () => {
  try {
    await apiCallWithAuth("/auth/logout", {
      method: "POST",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.clear();
  }
};

export const getCurrentUser = async () => {
  const response = await apiCallWithAuth("/auth/me", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};
