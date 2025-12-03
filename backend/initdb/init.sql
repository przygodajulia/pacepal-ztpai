-- USERS
CREATE TABLE IF NOT EXISTS users (
    userid      SERIAL PRIMARY KEY,
    email       VARCHAR NOT NULL UNIQUE,
    password    VARCHAR NOT NULL,
    name        VARCHAR NOT NULL,
    surname     VARCHAR NOT NULL,
    location    VARCHAR
);

-- ALTER TABLE users OWNER TO docker;

-- RACES
CREATE TABLE IF NOT EXISTS races (
    raceid      SERIAL PRIMARY KEY,
    title       VARCHAR NOT NULL,
    location    VARCHAR NOT NULL,
    date        DATE NOT NULL,
    price       DOUBLE PRECISION NOT NULL,
    description TEXT,
    imageurl    TEXT NOT NULL,
    distance    VARCHAR
);

-- ALTER TABLE races OWNER TO docker;

-- USER REGISTRATIONS
CREATE TABLE IF NOT EXISTS user_race_registration (
    registrationid SERIAL PRIMARY KEY,
    userid         INTEGER NOT NULL REFERENCES users(userid) ON DELETE CASCADE,
    raceid         INTEGER NOT NULL REFERENCES races(raceid) ON DELETE CASCADE,
    finished       VARCHAR(1)
);

-- ALTER TABLE user_race_registration OWNER TO docker;

-- ADMINS
CREATE TABLE IF NOT EXISTS admins (
    adminid   SERIAL PRIMARY KEY,
    userid    INTEGER NOT NULL REFERENCES users(userid) ON DELETE CASCADE,
    privilige VARCHAR
);

-- ALTER TABLE admins OWNER TO docker;

-- RACE RESULTS
CREATE TABLE IF NOT EXISTS race_results (
    resultid SERIAL PRIMARY KEY,
    raceid   INTEGER NOT NULL REFERENCES races(raceid) ON DELETE CASCADE,
    userid   INTEGER NOT NULL REFERENCES users(userid) ON DELETE CASCADE,
    time     VARCHAR NOT NULL,
    place    INTEGER NOT NULL
);

-- ALTER TABLE race_results OWNER TO docker;
