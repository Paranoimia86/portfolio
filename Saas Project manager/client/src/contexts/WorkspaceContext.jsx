import { useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/api";
import { WorkspaceContext } from "./WorkspaceContextDef";

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      loadWorkspaces();
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleAuthChanged = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setLoading(true);
        loadWorkspaces();
      } else {
        setWorkspaces([]);
        setActiveWorkspace(null);
        setLoading(false);
      }
    };

    window.addEventListener("auth-changed", handleAuthChanged);
    return () => window.removeEventListener("auth-changed", handleAuthChanged);
  }, []);

  const loadWorkspaces = async () => {
    try {
      const response = await fetchWithAuth("/workspaces");
      const data = await response.json();
      if (response.ok && data.workspaces && data.workspaces.length > 0) {
        setWorkspaces(data.workspaces);
        const savedWorkspaceId = localStorage.getItem("activeWorkspaceId");
        const workspace = savedWorkspaceId
          ? data.workspaces.find((w) => w._id === savedWorkspaceId)
          : data.workspaces[0];
        setActiveWorkspace(workspace || data.workspaces[0]);
      } else {
        setWorkspaces([]);
        setActiveWorkspace(null);
      }
    } catch (error) {
      console.error("Failed to load workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchWorkspace = (workspace) => {
    setActiveWorkspace(workspace);
    localStorage.setItem("activeWorkspaceId", workspace._id);
  };

  const refreshWorkspaces = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setLoading(true);
      loadWorkspaces();
    }
  };

  const refreshUser = async () => {
    try {
      const response = await fetchWithAuth("/auth/me");
      const data = await response.json();
      if (response.ok) {
        setUser(data.user || null);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        switchWorkspace,
        loading,
        refreshWorkspaces,
        user,
        refreshUser,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
