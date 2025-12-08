import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- added
import { loginUser } from "../../api/auth"; // your API function

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate(); // <-- added

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      const token = res.data.token; // get token from API response
      localStorage.setItem("token", token); // store token locally
  
      setMessages(["Login successful!"]);
      console.log("LOGIN SUCCESS:", res.data);
  
      // Redirect to /races after successful login
      navigate("/races");
    } catch (err) {
      setMessages(["Login failed"]);
      console.error(err);
    }
  };
  

  return (
    <div className="single-login-form single-login-form-style single-login-form-1">
      <img className="login-icon" src="/img/sign-in.png" alt="sign in icon" />
      <h2 className="simple-login-header">Welcome!</h2>
      <form onSubmit={handleLogin}>
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
        <input
          name="email"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="blue-button">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
