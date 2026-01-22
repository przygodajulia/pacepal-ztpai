import { useEffect, useState } from "react";
import { getAllRaces } from "../api/races";
import RaceCard from "../components/Races/RaceCard";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

function RacesPage() {
  const [races, setRaces] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredRaces = races.filter((race) => {
    if (search && !race.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <Navbar current="races" />

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
      <Footer />
    </div>
  );
}

export default RacesPage;
