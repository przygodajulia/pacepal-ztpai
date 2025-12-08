import { useEffect, useState } from "react";
import { getAllRaces } from "../api/races"; // we will create this API helper
import RaceCard from "../components/Races/RaceCard";

function RacesPage() {
  const [races, setRaces] = useState([]);
  const [search, setSearch] = useState("");

  // Load races from backend
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await getAllRaces();
        setRaces(res.data);
      } catch (err) {
        console.error("Failed loading races:", err);
      }
    };

    fetchRaces();
  }, []);

  // Filter by search
  const filteredRaces = races.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

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
            <li><a className="nav-link mark-current" href="/races">Races Calendar</a></li>
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
        <div className="races-main-container">

          {/* SEARCH */}
          <div className="search-container">
            <h2 className="default-smaller-header">Search</h2>
            <div className="single-search-container light-gray-box-style gray-mobile-box-filter">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* FILTERS (static for now — functional later) */}
          <div className="filters-races">
            <h2 className="default-smaller-header">Filters</h2>
            <div className="box-filters-race-calendar light-gray-box-style gray-mobile-box-filter">
              <button className="big-purple-button" type="button" id="filter-dates">
                Dates
              </button>
              <div className="date-options filter-options">
                {/* Months dynamically later */}
              </div>

              <button className="big-purple-button" type="button" id="filter-distance">
                Distance
              </button>
              <div className="distance-options filter-options"></div>

              <button className="big-purple-button" type="button" id="filter-location">
                Location
              </button>
              <div className="location-options filter-options"></div>
            </div>
          </div>

          {/* DISPLAY RACES */}
          <div className="displayed-races">
            <h2 className="default-smaller-header">Races</h2>
            <div className="displayed-races-main-container light-gray-box-style">
              <section className="races">
                {filteredRaces.map((race) => (
                  <RaceCard key={race.raceid} race={race} />
                ))}
              </section>
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

export default RacesPage;