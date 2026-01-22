import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../api/user";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

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
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return null;

  return (
    <div>
      {/* Header */}
      <Navbar current="my_account" />

      {/* Main */}
      <main>
        <div className="my-account-main-container my-account-mobile-box">
          <div className="my-account-header-container">
            <img className="my-account-icon" src="/img/teamwork.png" alt="user icon" />
            <h2 className="my-account-name-header-mobile">
              {user.name} {user.surname}
            </h2>
          </div>

          <div className="my-account-user-data-container light-gray-box-style my-account-form">
            <h2 className="my-account-name-header-desktop">
              {user.name} {user.surname}
            </h2>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyAccountPage;
