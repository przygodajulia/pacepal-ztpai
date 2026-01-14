import { useEffect, useState } from "react";
import { getAllRaces } from "../api/races";
import RaceCard from "../components/Races/RaceCard";

function RacesPage() {
  const [races, setRaces] = useState([]);
  const [search, setSearch] = useState("");

  // Load races
  useEffect(() => {
    const fetchData = async () => {
      try {
        const racesRes = await getAllRaces();
        setRaces(racesRes.data);
      } catch (err) {
        console.error("Failed loading races:", err);
      }
    };

    fetchData();
  }, []);

  // Apply search filter only
  const filteredRaces = races.filter((race) => {
    if (search && !race.title.toLowerCase().includes(search.toLowerCase()))
      return false;
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
