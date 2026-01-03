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

-- ===== 2025 RACES (COMPLETED / PAST) =====

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
 '15 km'),

('Rome City Marathon', 'Rome, Italy', '2025-03-16', 95.00,
 'Historic marathon past ancient Roman landmarks.',
 '/img/run1.jpeg',
 '42.2 km'),

('Barcelona Spring Run', 'Barcelona, Spain', '2025-04-12', 50.00,
 'Fast and flat coastal race perfect for PBs.',
 '/img/run3.jpg',
 '10 km'),

('Amsterdam Half Marathon', 'Amsterdam, Netherlands', '2025-10-19', 75.00,
 'Flat and scenic course through the Dutch capital.',
 '/img/run3.jpg',
 '21.1 km'),

('Prague Night Run', 'Prague, Czech Republic', '2025-08-23', 40.00,
 'Magical evening race through the old town.',
 '/img/run2.jpg',
 '10 km'),

('Vienna City Run', 'Vienna, Austria', '2025-05-11', 60.00,
 'Run through imperial streets and parks.',
 '/img/run4.jpg',
 '15 km'),

('Madrid Rock n Run', 'Madrid, Spain', '2025-09-07', 55.00,
 'Lively city race with music along the route.',
 '/img/run2.jpg',
 '10 km'),

('Lisbon Half Marathon', 'Lisbon, Portugal', '2025-03-09', 70.00,
 'Iconic bridge crossing with ocean views.',
 '/img/run3.jpg',
 '21.1 km'),

('Dublin City Marathon', 'Dublin, Ireland', '2025-10-26', 110.00,
 'Friendly marathon with huge crowd support.',
 '/img/run1.jpeg',
 '42.2 km'),

('Edinburgh Scenic Run', 'Edinburgh, UK', '2025-06-01', 45.00,
 'Historic and scenic summer run.',
 '/img/run4.jpg',
 '10 km'),

('Copenhagen City 10K', 'Copenhagen, Denmark', '2025-05-25', 48.00,
 'Fast and eco-friendly urban race.',
 '/img/run4.jpg',
 '10 km'),

-- ===== 2026 RACES (FUTURE – SECOND HALF) =====

('Sydney Harbour Run', 'Sydney, Australia', '2026-07-12', 85.00,
 'Spectacular waterfront race around Sydney Harbour.',
 '/img/run2.jpg',
 '21.1 km'),

('Cape Town Coastal Run', 'Cape Town, South Africa', '2026-08-09', 60.00,
 'Breathtaking ocean and mountain views.',
 '/img/run3.jpg',
 '15 km'),

('San Francisco Bay 10K', 'San Francisco, USA', '2026-09-05', 55.00,
 'Iconic city run with rolling hills.',
 '/img/run4.jpg',
 '10 km'),

('Chicago Autumn Marathon', 'Chicago, USA', '2026-10-11', 125.00,
 'Flat and fast course through downtown Chicago.',
 '/img/run1.jpeg',
 '42.2 km'),

('Toronto Waterfront Half', 'Toronto, Canada', '2026-08-30', 78.00,
 'Scenic lakeside half marathon.',
 '/img/run3.jpg',
 '21.1 km'),

('Seoul City Night Run', 'Seoul, South Korea', '2026-09-18', 50.00,
 'Vibrant night race through the capital.',
 '/img/run2.jpg',
 '10 km'),

('Singapore Sunset Run', 'Singapore', '2026-07-25', 58.00,
 'Tropical evening run with skyline views.',
 '/img/run2.jpg',
 '10 km'),

('Hong Kong Harbour Half', 'Hong Kong', '2026-11-15', 82.00,
 'Fast-paced race along Victoria Harbour.',
 '/img/run3.jpg',
 '21.1 km'),

('Athens Classic Marathon', 'Athens, Greece', '2026-11-08', 115.00,
 'Historic marathon following the original route.',
 '/img/run1.jpeg',
 '42.2 km'),

('Istanbul Bridge Run', 'Istanbul, Turkey', '2026-09-20', 65.00,
 'Unique race crossing two continents.',
 '/img/run4.jpg',
 '15 km'),

('Munich Oktoberfest Run', 'Munich, Germany', '2026-10-04', 52.00,
 'Festive run during Oktoberfest season.',
 '/img/run2.jpg',
 '10 km'),

('Zurich Lake Half', 'Zurich, Switzerland', '2026-08-16', 90.00,
 'Crystal-clear lake views and alpine backdrop.',
 '/img/run3.jpg',
 '21.1 km'),

('Budapest Danube Run', 'Budapest, Hungary', '2026-09-06', 47.00,
 'Flat course along the Danube river.',
 '/img/run4.jpg',
 '10 km'),

('Reykjavik Midnight Sun Run', 'Reykjavik, Iceland', '2026-07-04', 62.00,
 'Run under the midnight sun.',
 '/img/run2.jpg',
 '10 km'),

('Valencia Winter Marathon', 'Valencia, Spain', '2026-12-06', 118.00,
 'Perfect winter marathon with ideal running weather.',
 '/img/run1.jpeg',
 '42.2 km');


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
