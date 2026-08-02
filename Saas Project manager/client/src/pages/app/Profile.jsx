import { fetchWithAuth } from "../../utils/api";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useWorkspace } from "../../hooks/useWorkspace";
import "./Profile.css";

function Profile() {
  const { activeWorkspace, user } = useWorkspace();
  const [projects, setprojects] = useState([]);
  const [loadingprojects, setLoadingProjects] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      if (!activeWorkspace?._id) {
        setprojects([]);
        return;
      }
      setLoadingProjects(true);
      try {
        const response = await fetchWithAuth(
          `/projects?workspaceId=${activeWorkspace._id}`,
        );
        const data = await response.json();
        if (response.ok) {
          setprojects(data.projects || []);
        } else {
          setprojects([]);
        }
      } catch {
        setprojects([]);
      } finally {
        setLoadingProjects(false);
      }
    };
    loadProjects();
  }, [activeWorkspace]);

  const randomTreeProjects = useMemo(() => {
    const copy = [...projects];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 3);
  }, [projects]);

  return (
    <div className="profile">
      <div className="profile-bar">
        <img src="/img/no_pp.jpg" alt="" />
        {user && (
          <div className="profile-info">
            <h3>
              {user.name || "Name"} {user.surname || "Surname"}
            </h3>
            <p>{user.email}</p>
          </div>
        )}
      </div>
      <div className="greet_profile-more_info">
        <div className="greet_profile">
          <h2>Welcome back!</h2>
          <p>
            Nice to meet you, {user?.name} {user?.surname}!
          </p>
        </div>
        <div className="more_info">
          <h3>Profile information</h3>
          {user && (
            <>
              <p>{user.bio}</p>
              <hr />
              <p>
                Full Name:{" "}
                <span>
                  {user.name || "---"} {user.surname || "---"}
                </span>
              </p>
              <p>
                Mobile: <span>{user.phone || "---"}</span>
              </p>
              <p>
                Email: <span>{user.email || "---"}</span>
              </p>
              <p>
                Country: <span>{user.country || "---"}</span>
              </p>
              <p>
                Registered:{" "}
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </p>
            </>
          )}
        </div>
      </div>
      <div className="projects">
        <h2>Projects</h2>
        <p>Your most visited projects</p>
        {loadingprojects ? (
          <p>Loading projects...</p>
        ) : randomTreeProjects.length === 0 ? (
          <p className="no-projects">No projects found</p>
        ) : (
          <div className="list">
            {randomTreeProjects.map((project) => (
              <div key={project._id}>
                <img src={project.image} />
                <h3>{project.name}</h3>
                <p>{project.description || "-"}</p>
                <Link to="/projects">
                  <button type="button">View all</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
