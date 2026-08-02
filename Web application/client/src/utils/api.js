const API_URL = "http://localhost:5000/api";

export const apiCall = async (endpoint, options = {}) => {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};

export const apiCallWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");
  const fullUrl = `http://localhost:5000/api${url}`;

  let response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const refreshResponse = await fetch(
          "http://localhost:5000/api/auth/refresh",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          },
        );
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem("accessToken", data.accessToken);

          // Skúsime request znova s novým tokenom
          response = await fetch(fullUrl, {
            ...options,
            headers: {
              "Content-Type": "application/json",
              ...options.headers,
              Authorization: `Bearer ${data.accessToken}`,
            },
          });
        } else {
          localStorage.clear();
          window.location.href = "/login";
        }
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
