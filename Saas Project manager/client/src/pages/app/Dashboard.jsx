import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api";
import "./Dashboard.css";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getGreeding = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning and welcome";
    if (hour < 18 && hour >= 12) return "Welcome back";
    return "Good evening and welcome";
  };

  const loadData = async () => {
    try {
      const response = await fetchWithAuth("/dashboard");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to load dashboard data");
      }
      setData(result);
    } catch (error) {
      setError("Error loading data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const timeoutDelay = nextMidnight.getTime() - now.getTime();
    let intervalId;
    const timeoutId = setTimeout(() => {
      loadData();

      intervalId = setInterval(() => {
        loadData();
      }, DAY_IN_MS);
    }, timeoutDelay);
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const maxActivityCount = Math.max(
    ...(data?.activity?.map((item) => item.count) || [1]),
    1,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  return (
    <div>
      <div className="greet-stats">
        <div className="greet">
          <div className="greet-text">
            <p>{getGreeding()},</p>
            <h2>{data.user.displayName}</h2>
            <p>Glad to see you again! Let's get to work.</p>
          </div>
          <img src="/img/greet-img.png" alt="" />
        </div>
        <div className="stats">
          {data && data.stats && (
            <div>
              <h2>Personal stats</h2>
              <p>
                Workspaces: <span>{data.stats.totalWorkspaces}</span>
              </p>
              <p>
                Total projects: <span>{data.stats.totalProjects}</span>
              </p>
              <p>
                Active projects: <span>{data.stats.activeProjects}</span>
              </p>
              <p>
                Completed projects: <span>{data.stats.completedProjects}</span>
              </p>
              <p>
                Archived projects: <span>{data.stats.archivedProjects}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      {data && data.activity && (
        <div className="activity-chart">
          <h2>Activity during the last week</h2>
          <div className="chart">
            <svg
              viewBox="0 0 500 350"
              width="100%"
              height="300"
              role="img"
              aria-label="Graf aktivity za posledný týždeň"
            >
              {/* Y-axis labels */}
              {[500, 400, 300, 200, 100, 0].map((val, i) => (
                <text
                  key={`y-${i}`}
                  x="10"
                  y={50 + i * 50}
                  fontSize="12"
                  fill="#fff"
                >
                  {val}
                </text>
              ))}

              {/* Axes */}
              <line
                x1="40"
                y1="300"
                x2="480"
                y2="300"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="40"
                x2="40"
                y2="300"
                stroke="currentColor"
                strokeWidth="2"
              />

              {/* Grid lines */}
              {[0, 50, 100, 150, 200, 250].map((val, i) => (
                <line
                  key={`grid-${i}`}
                  x1="40"
                  y1={300 - val}
                  x2="480"
                  y2={300 - val}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Bars */}
              {data.activity.map((item, index) => {
                const barWidth = 20;
                const gap = 40;
                const x = 60 + index * (barWidth + gap);
                const barHeight = (item.count / maxActivityCount) * 260;
                const y = 300 - barHeight;

                return (
                  <g key={item.key}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill="#fff"
                      rx="8"
                      ry="8"
                    />
                    <text
                      x={x + barWidth / 2}
                      y="320"
                      textAnchor="middle"
                      fontSize="11"
                      fill="#fff"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
