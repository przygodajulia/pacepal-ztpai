const db = require("../src/db");

const getUserRaces = async (userId) => {
  const query = `
    SELECT r.raceid, r.title, r.location, r.date, r.price, r.description, r.imageurl, r.distance,
           CASE WHEN r.date < NOW() THEN TRUE ELSE FALSE END AS finished
    FROM races r
    JOIN user_race_registration ur ON ur.raceid = r.raceid
    WHERE ur.userid = $1
    ORDER BY r.date ASC
  `;
  return db.query(query, [userId]);
};

module.exports = {
  getUserRaces,
};
