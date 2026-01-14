const db = require("../src/db");

const getUserById = async (userId) => {
  const query = `
    SELECT userid, name, surname, email, location
    FROM users
    WHERE userid = $1
  `;
  return db.query(query, [userId]);
};

module.exports = {
  getUserById,
};
