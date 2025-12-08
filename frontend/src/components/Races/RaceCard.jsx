import { useNavigate } from "react-router-dom";

function RaceCard({ race }) {
    const navigate = useNavigate();

    // Format the date to a readable format, e.g., "December 8, 2025"
    const formattedDate = new Date(race.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    return (
      <div
        className="displayed-races-single-container dark-gray-box-style gray-mobile-box"
        data-distance={race.distance}
        data-location={race.location}
        data-date={formattedDate} // update data attribute as well
      >
        <img
          className="default-race-img races-img"
          src={race.imageurl}
          alt="race"
        />
  
        <h2 className="default-smaller-header race-calendar-header">
          {race.title}
        </h2>
  
        <div className="icon-text-container icon-text-container-1">
          <img
            className="race-details-small-icon"
            src="/img/location.png"
            alt="location"
          />
          <p className="race-details-text">{race.location}</p>
        </div>
  
        <div className="icon-text-container icon-text-container-2">
          <img
            className="race-details-small-icon mobile-races-date-icon"
            src="/img/timetable.png"
            alt="date"
          />
          <p className="race-details-text">{formattedDate}</p>
        </div>
  
        <div className="icon-text-container icon-text-container-3">
          <img
            className="race-details-small-icon"
            src="/img/tag.png"
            alt="price"
          />
          <p className="race-details-text">${race.price}</p>
        </div>
  
        <form action="/race_details" method="GET">
          <input type="hidden" name="race_id" value={race.raceid} />
          <button
            className="blue-button smaller-button races-calendar-button"
            onClick={() => navigate(`/races/${race.raceid}`)}
          >
            More
          </button>
        </form>
      </div>
    );
  }
  
  export default RaceCard;  