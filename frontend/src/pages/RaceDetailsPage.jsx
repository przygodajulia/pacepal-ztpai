import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRaceById } from "../api/races"; // we’ll create this helper

function RaceDetailsPage() {
  const { id } = useParams(); // get race_id from URL
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const res = await getRaceById(id);
        setRace(res.data);
      } catch (err) {
        console.error("Failed loading race:", err);
        setError("Race not found or you are not authorized.");
      } finally {
        setLoading(false);
      }
    };

    fetchRace();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!race) return null;

  // Format date
  const formattedDate = new Date(race.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            <li><a className="nav-link" href="/my_account">My Account</a></li>
          </ul>
        </div>
        <img className="mobile-menu-icon" src="/img/menu.png" alt="menu icon" />
        <div className="mobile-menu-container">
          <ul>
            <li><a href="/races">Races Calendar</a></li>
            <li><a href="/my_races">My Races</a></li>
            <li><a href="/my_account">My Account</a></li>
            <li><a href="/races">Close</a></li>
          </ul>
        </div>
      </nav>

      {/* MAIN */}
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

            <form className="race-details-form" action="/sign_up" method="GET">
              <input type="hidden" name="race_id" value={race.raceid} />
              <button className="smaller-race-details-button blue-button race-details-button" type="submit">
                Sign Up!
              </button>
            </form>
          </div>

          <div className="race-details-add-description">
            <h2 className="default-smaller-header">Details</h2>
            <p className="race-details-paragraph">{race.description}</p>
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

export default RaceDetailsPage;
