const API_URL = "http://localhost:5000/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  const makeRequest = async (token) => {
    return fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  };

  let response = await makeRequest(accessToken);
  console.log("Response status:", response.status);

  if (response.status === 401) {
    console.log("Token expired, refreshing...");
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return response;
      }
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem("accessToken", data.accessToken);
        response = await makeRequest(data.accessToken);
      } else {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.clear();
      window.location.href = "/login";
    }
  }
  return response;
};
