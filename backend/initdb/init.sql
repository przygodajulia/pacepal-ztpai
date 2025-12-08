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

-- Insert sample races
INSERT INTO races (title, location, date, price, description, imageurl, distance) VALUES
('Berlin Marathon', 'Berlin, Germany', '2025-09-28', 120.00,
 'One of the fastest and most iconic marathons in the world.',
 '/img/run1.jpeg',
 '42.2 km'),

('London Marathon', 'London, UK', '2025-04-26', 140.00,
 'A world major marathon through the heart of London.',
 '/img/run2.jpg',
 '42.2 km'),

('Paris Half Marathon', 'Paris, France', '2025-03-02', 65.00,
 'Scenic half marathon passing many famous landmarks.',
 '/img/run3.jpg',
 '21.1 km'),

('NYC 10K Classic', 'New York, USA', '2025-06-10', 45.00,
 'Popular 10K race in Central Park.',
 '/img/run4.jpg',
 '10 km'),

('Tokyo Night Run', 'Tokyo, Japan', '2025-10-15', 55.00,
 'Evening race with an amazing neon-city atmosphere.',
 '/img/run2.jpg',
 '15 km');

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
