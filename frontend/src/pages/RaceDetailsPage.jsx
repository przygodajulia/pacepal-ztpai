import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRaceById, signUpForRace } from "../api/races";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

function RaceDetailsPage() {
  const { id } = useParams();
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const res = await getRaceById(id);
        setRace(res.data);

        if (res.data.isRegistered) {
          setSignedUp(true);
          setSignupStatus("You are already registered for this race!");
        }
      } catch (err) {
        console.error("Failed loading race:", err);
        setError("Race not found or you are not authorized.");
      } finally {
        setLoading(false);
      }
    };

    fetchRace();
  }, [id]);

  const handleSignUp = async () => {
    setSignupLoading(true);
    setSignupStatus("");
    try {
      await signUpForRace(id);
      setSignupStatus("You have successfully registered for this race!");
      setSignedUp(true); // disable the button after signup
    } catch (err) {
      console.error("Sign up failed:", err);
      const message =
        err.response?.data?.error || "Failed to sign up for race";
      setSignupStatus(message);
    } finally {
      setSignupLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!race) return null;

  const formattedDate = new Date(race.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Header */}
      <Navbar current="races" />

      {/* Main */}
      <main>
        <div className="race-details-main-container dark-gray-box-style gray-mobile-box">
          <div className="smaller-padding-and-margin displayed-races-single-container no-shadow">
            <img
              className="race-details-smaller-img default-race-img"
              src={race.imageurl}
              alt="race"
            />
            <h2 className="default-smaller-header race-details-header">{race.title}</h2>

            <div className="icon-text-container race-details-icon-text-1">
              <img className="race-details-small-icon" src="/img/location.png" alt="location" />
              <p className="race-details-text">{race.location}</p>
            </div>

            <div className="icon-text-container race-details-icon-text-2">
              <img className="race-details-small-icon mobile-races-date-icon" src="/img/timetable.png" alt="date" />
              <p className="race-details-text">{formattedDate}</p>
            </div>

            <div className="icon-text-container race-details-icon-text-3">
              <img className="race-details-small-icon" src="/img/tag.png" alt="price" />
              <p className="race-details-text">${race.price}</p>
            </div>

            {/* Sign up button */}
            <button
              className="smaller-race-details-button blue-button race-details-button"
              onClick={handleSignUp}
              disabled={signupLoading || signedUp}
            >
              {signupLoading ? "Signing up..." : signedUp ? "Registered" : "Sign Up!"}
            </button>

            {/* Signup status */}
            {signupStatus && (
              <p style={{ marginTop: "10px", fontWeight: "bold", color: "black" }}>
                {signupStatus}
              </p>
            )}
          </div>

          <div className="race-details-add-description">
            <h2 className="default-smaller-header">Details</h2>
            <p className="race-details-paragraph">{race.description}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RaceDetailsPage;
