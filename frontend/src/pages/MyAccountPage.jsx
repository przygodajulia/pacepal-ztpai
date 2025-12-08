import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../api/user";
import { useNavigate } from "react-router-dom";

function MyAccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.error("Failed loading user:", err);
        setError("Failed to fetch user info. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to login page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return null;

  return (
    <div>
      {/* NAVBAR */}
      <nav>
        <div className="default-nav-header">
          <img className="header-img" src="/img/running_girl.png" alt="main logo" />
          <h1 className="default-header-text">Pacepal</h1>
        </div>
        <div className="default-nav-list">
          <ul>
            <li><a className="nav-link" href="/races">Races Calendar</a></li>
            <li><a className="nav-link" href="/my_races">My Races</a></li>
            <li><a className="nav-link mark-current" href="/my_account">My Account</a></li>
          </ul>
        </div>
        <img className="mobile-menu-icon" src="/img/menu.png" alt="menu icon" />
        <div className="mobile-menu-container">
          <ul>
            <li><a href="/races">Races Calendar</a></li>
            <li><a href="/my_races">My Races</a></li>
            <li><a className="mark-current" href="/my_account">My Account</a></li>
            <li><a href="/my_account">Close</a></li>
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main>
        <div className="my-account-main-container my-account-mobile-box">
          <div className="my-account-header-container">
            <img className="my-account-icon" src="/img/teamwork.png" alt="user icon" />
            <h2 className="my-account-name-header-mobile">{user.name} {user.surname}</h2>
          </div>

          <div className="my-account-user-data-container light-gray-box-style my-account-form">
            <h2 className="my-account-name-header-desktop">{user.name} {user.surname}</h2>
            <div className="separator"></div>

            <div className="my-account-form">
              <h3 className="my-account-header">Email</h3>
              <input type="text" value={user.email} readOnly />
              <h3 className="my-account-header">Location</h3>
              <input type="text" value={user.location} readOnly />
              <h3 className="my-account-header">Password</h3>
              <input type="password" value="*****" readOnly />

              <button
                className="blue-button my-account-button my-account-button-2"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2024 Pacepal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MyAccountPage;
