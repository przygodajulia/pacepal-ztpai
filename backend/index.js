require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { signToken, requireAuth } = require("./routes/auth");
const rabbitmq = require("./rabbitmq");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// FAKE users database
const users = [
    { id: 1, email: "test@example.com", password: "1234", name: "Julia" },
];

// Połączenie z RabbitMQ
rabbitmq.connect();

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const token = signToken(user);
    res.json({ token });
});

// PROFILE
app.get("/profile", requireAuth, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    res.json({ message: "Authenticated!", user });
});

// TEST ROUTE
app.get("/api", (req, res) => {
    res.json({ message: "Backend works" });
});

// NOWA ROUTA: zapis na wyścig
app.post("/register-race", (req, res) => {
    const { userId, race } = req.body;
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    rabbitmq.sendMessage({ user: user.name, race });
    res.json({ status: "ok", message: "Zapisano na wyścig i wysłano do kolejki" });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
