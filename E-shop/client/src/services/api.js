const API_URL = "http://localhost:5000/api";

const notifyAuthChange = () => {
  window.dispatchEvent(new Event("authchange"));
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { message: text || "Neočakávaná odpoveď servera" };
  }
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem("accessToken", data.accessToken);

        return fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.accessToken}`,
            ...options.headers,
          },
        });
      }
    }

    localStorage.clear();
  }

  return response;
};

export const apiGet = async (endpoint) => {
  const response = await fetchWithAuth(endpoint);
  return parseResponse(response);
};

export const apiPost = async (endpoint, data) => {
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return parseResponse(response);
};

export const apiPut = async (endpoint, data) => {
  const response = await fetchWithAuth(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return parseResponse(response);
};

export const apiDelete = async (endpoint) => {
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
  return parseResponse(response);
};

export const authLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await parseResponse(response);

  if (response.ok) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    notifyAuthChange();
  }

  return data;
};

export const authRegister = async (payload) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseResponse(response);

  if (response.ok) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    notifyAuthChange();
  }

  return data;
};

export const authLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  notifyAuthChange();
};
