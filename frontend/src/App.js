import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [location, setLocation] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const backendUrl = "http://localhost:5001";

  // Register new user
  const register = async () => {
    try {
      const res = await axios.post(`${backendUrl}/auth/register-user`, {
        email,
        password,
        name,
        surname,
        location,
      });
      setToken(res.data.token);
      setMessage("Registered successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  // Login existing user
  const login = async () => {
    try {
      const res = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });
      setToken(res.data.token);
      setMessage("Logged in successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  // Test protected route
  const testProtected = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Protected route response: " + JSON.stringify(res.data));
    } catch (err) {
      setMessage(err.response?.data?.error || "Access denied");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>PacePal Auth Demo</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
      <input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} /><br/>
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} /><br/><br/>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={testProtected}>Test Protected Route</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
