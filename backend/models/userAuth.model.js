const db = require("../src/db");

const createUser = async ({ email, hashedPassword, name, surname, location }) => {
  const insertQuery = `
    INSERT INTO users (email, password, name, surname, location)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING userid, email, name, surname, location
  `;
  return db.query(insertQuery, [email, hashedPassword, name, surname, location || null]);
};

const getUserByEmail = async (email) => {
  const { rows } = await db.query(
    "SELECT userid, email, password FROM users WHERE email=$1",
    [email]
  );
  return rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};
