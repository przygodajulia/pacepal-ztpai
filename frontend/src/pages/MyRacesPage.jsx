import { useEffect, useState } from "react";
import { getMyRaces } from "../api/myraces";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

function MyRacesPage() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
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
      {/* Header */}
      <Navbar current="my_races" />

      {/* Main */}
      <main>
        <div className="races-main-container">
          {/* Filters */}
          <div className="filters-races">
            <h2 className="default-smaller-header">Filters</h2>
            <div className="box-filters-race-calendar light-gray-box-style gray-mobile-box">
              <button className="big-purple-button" onClick={() => handleFilter("upcoming")}>
                Upcoming
              </button>
              <button className="big-purple-button" onClick={() => handleFilter("finished")}>
                Finished
              </button>
              <button className="big-purple-button" onClick={() => handleFilter("all")}>
                All
              </button>
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
                  <div
                    key={race.raceid}
                    className="my-races-single-container dark-gray-box-style gray-mobile-box"
                  >
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyRacesPage;
