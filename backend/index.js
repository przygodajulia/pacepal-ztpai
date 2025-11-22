require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { signToken, requireAuth } = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ---- FAKE users database ----
const users = [
    { id: 1, email: "test@example.com", password: "1234", name: "Julia" },
];

// ----------- ROUTES -----------

// LOGIN → zwraca token
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);
    console.log("Generated token:", token);
    res.json({ token });
});

// PROFILE → wymaga poprawnego tokena
app.get("/profile", requireAuth, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    res.json({ message: "Authenticated!", user });
});

// TEST ROUTE
app.get("/api", (req, res) => {
    res.json({ message: "Backend works" });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
