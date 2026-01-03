import { useEffect, useState } from "react";
import {
  getAllRaces,
  getRaceDistances,
  getRaceLocations,
} from "../api/races";
import RaceCard from "../components/Races/RaceCard";

function RacesPage() {
  const [races, setRaces] = useState([]);
  const [search, setSearch] = useState("");

  const [distances, setDistances] = useState([]);
  const [locations, setLocations] = useState([]);

  const [dateFilter, setDateFilter] = useState(null); // "past" | "upcoming"
  const [distanceFilter, setDistanceFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);

  // Toggle dropdowns
  const [showDates, setShowDates] = useState(false);
  const [showDistances, setShowDistances] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  // Load races + filter data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [racesRes, distancesRes, locationsRes] = await Promise.all([
          getAllRaces(),
          getRaceDistances(),
          getRaceLocations(),
        ]);

        setRaces(racesRes.data);
        setDistances(distancesRes.data);
        setLocations(locationsRes.data);
      } catch (err) {
        console.error("Failed loading races or filters:", err);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  const today = new Date();

  const filteredRaces = races.filter((race) => {
    const raceDate = new Date(race.date);

    if (search && !race.title.toLowerCase().includes(search.toLowerCase()))
      return false;

    if (dateFilter === "past" && raceDate >= today) return false;
    if (dateFilter === "upcoming" && raceDate < today) return false;

    if (distanceFilter && race.distance !== distanceFilter) return false;
    if (locationFilter && race.location !== locationFilter) return false;

    return true;
  });

  return (
    <div>
      {/* NAVBAR */}
      <nav>
        <div className="default-nav-header">
          <img
            className="header-img"
            src="/img/running_girl.png"
            alt="main logo"
          />
          <h1 className="default-header-text">Pacepal</h1>
        </div>

        <div className="default-nav-list">
          <ul>
            <li>
              <a className="nav-link mark-current" href="/races">
                Races Calendar
              </a>
            </li>
            <li>
              <a className="nav-link" href="/my_races">
                My Races
              </a>
            </li>
            <li>
              <a className="nav-link" href="/my_account">
                My Account
              </a>
            </li>
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

          {/* FILTERS */}
          <div className="filters-races">
            <h2 className="default-smaller-header">Filters</h2>
            <div className="box-filters-race-calendar light-gray-box-style gray-mobile-box-filter">
              {/* DATES */}
              <button
                className="big-purple-button"
                type="button"
                onClick={() => setShowDates((prev) => !prev)}
              >
                Dates
              </button>
              {showDates && (
                <div className="date-options filter-options">
                  <button
                    className="date-option filter-option"
                    onClick={() => setDateFilter("upcoming")}
                  >
                    Upcoming
                  </button>
                  <button
                    className="date-option filter-option"
                    onClick={() => setDateFilter("past")}
                  >
                    Past
                  </button>
                </div>
              )}

              {/* DISTANCE */}
              <button
                className="big-purple-button"
                type="button"
                onClick={() => setShowDistances((prev) => !prev)}
              >
                Distance
              </button>
              {showDistances && (
                <div className="distance-options filter-options">
                  {distances.map((d) => (
                    <button
                      key={d.distance}
                      className="distance-option filter-option"
                      onClick={() => setDistanceFilter(d.distance)}
                    >
                      {d.distance}
                    </button>
                  ))}
                </div>
              )}

              {/* LOCATION */}
              <button
                className="big-purple-button"
                type="button"
                onClick={() => setShowLocations((prev) => !prev)}
              >
                Location
              </button>
              {showLocations && (
                <div className="location-options filter-options">
                  {locations.map((l) => (
                    <button
                      key={l.location}
                      className="location-option filter-option"
                      onClick={() => setLocationFilter(l.location)}
                    >
                      {l.location}
                    </button>
                  ))}
                </div>
              )}
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
