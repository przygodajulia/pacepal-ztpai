// backend/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // pozwala na parsowanie JSON w POST/PUT

// === Sample races to be returned by the first endpoint ===
const races = [
  {
    id: 1,
    raceTitle: "Warsaw Marathon",
    raceLocation: "Warsaw",
    raceDate: "2025-04-15",
    racePrice: 150,
    raceDescription: "Annual marathon through the center of Warsaw.",
    raceDistance: "42 km",
  },
  {
    id: 2,
    raceTitle: "Krakow Night Run",
    raceLocation: "Krakow",
    raceDate: "2025-06-10",
    racePrice: 80,
    raceDescription: "Evening 10k run along the Vistula river.",
    raceDistance: "10 km",
  },
  {
    id: 3,
    raceTitle: "Gdansk Half Marathon",
    raceLocation: "Gdansk",
    raceDate: "2025-08-20",
    racePrice: 120,
    raceDescription: "Half marathon along the Baltic coast.",
    raceDistance: "21 km",
  },
];

// === Test endpoint ===
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

// === First project endpoint: GET /api/races ===
app.get("/api/races", (req, res) => {
  res.status(200).json(races);
});

// === Endpoint: GET /api/races/:id ===
app.get("/api/races/:id", (req, res) => {
  const raceId = parseInt(req.params.id);

  // 400 Bad Request if ID not a number
  if (isNaN(raceId)) {
    return res.status(400).json({ error: "Invalid race ID. Must be a number." });
  }

  const race = races.find(r => r.id === raceId);

  if (race) {
    res.status(200).json(race);
  } else {
    res.status(404).json({ error: `Race with id ${raceId} not found` });
  }
});


app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
