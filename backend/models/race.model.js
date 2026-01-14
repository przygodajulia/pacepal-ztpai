const db = require("../src/db");

const getAllRaces = async () => {
  const query = `
    SELECT raceid, title, location, date, price, description, imageurl, distance
    FROM races
    ORDER BY date ASC
  `;
  return db.query(query);
};

const getRaceById = async (id) => {
  const query = `
    SELECT raceid, title, location, date, price, description, imageurl, distance
    FROM races
    WHERE raceid = $1
  `;
  return db.query(query, [id]);
};

const isUserRegistered = async (userId, raceId) => {
  return db.query(
    "SELECT 1 FROM user_race_registration WHERE userid = $1 AND raceid = $2",
    [userId, raceId]
  );
};

const registerUser = async (userId, raceId) => {
  return db.query(
    `INSERT INTO user_race_registration (userid, raceid)
     VALUES ($1, $2)
     RETURNING registrationid`,
    [userId, raceId]
  );
};

module.exports = {
  getAllRaces,
  getRaceById,
  isUserRegistered,
  registerUser
};
