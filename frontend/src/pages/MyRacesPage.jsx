import { useEffect, useState } from "react";
import { getMyRaces } from "../api/myraces";
import { useNavigate } from "react-router-dom";

function MyRacesPage() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "upcoming", "finished"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await getMyRaces();
        setRaces(res.data);
      } catch (err) {
        console.error("Failed loading my races:", err);
        setError("Failed to fetch your races.");
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  const handleFilter = (status) => setFilter(status);

  const filteredRaces = races.filter((race) => {
    if (filter === "upcoming") return !race.finished;
    if (filter === "finished") return race.finished;
    return true;
  });

  const handleViewResults = (raceId) => {
    navigate(`/race_results/${raceId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
            <li><a className="nav-link mark-current" href="/my_races">My Races</a></li>
            <li><a className="nav-link" href="/my_account">My Account</a></li>
          </ul>
        </div>
        <img className="mobile-menu-icon" src="/img/menu.png" alt="menu icon" />
        <div className="mobile-menu-container">
          <ul>
            <li><a href="/races">Races Calendar</a></li>
            <li><a className="mark-current" href="/my_races">My Races</a></li>
            <li><a href="/my_account">My Account</a></li>
            <li><a href="/my_races">Close</a></li>
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main>
        <div className="races-main-container">
          {/* Filters */}
          <div className="filters-races">
            <h2 className="default-smaller-header">Filters</h2>
            <div className="box-filters-race-calendar light-gray-box-style gray-mobile-box">
              <button className="big-purple-button" onClick={() => handleFilter("upcoming")}>Upcoming</button>
              <button className="big-purple-button" onClick={() => handleFilter("finished")}>Finished</button>
              <button className="big-purple-button" onClick={() => handleFilter("all")}>All</button>
            </div>
          </div>

          {/* Race List */}
          <div className="displayed-races">
            <div className="displayed-races-main-container light-gray-box-style">
              {filteredRaces.length === 0 && <p>No races found.</p>}

              {filteredRaces.map((race) => {
                const statusText = race.finished ? "Finished" : "Upcoming";
                const statusIcon = race.finished ? "/img/checked.png" : "/img/upcoming.png";

                return (
                  <div key={race.raceid} className="my-races-single-container dark-gray-box-style gray-mobile-box">
                    <img className="my-races-img" src={race.imageurl} alt="race" />
                    <h2 className="my-races-header">{race.title}</h2>
                    <div className="icon-text-container my-races-icon-text">
                      <img className="my-races-small-icon" src={statusIcon} alt="status icon" />
                      <p className="my-races-text">{statusText}</p>
                    </div>
                    {race.finished && (
                      <button
                        className="blue-button my-races-results"
                        onClick={() => handleViewResults(race.raceid)}
                      >
                        View results
                      </button>
                    )}
                  </div>
                );
              })}
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

export default MyRacesPage;
