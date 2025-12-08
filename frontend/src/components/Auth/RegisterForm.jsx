import { useState } from "react";
import { registerUser } from "../../api/auth";

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    location: "",
  });

  const [messages, setMessages] = useState([]);

  // Update form state when inputs change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send the exact fields backend expects
      const res = await registerUser(form);
      setMessages(["Registration successful!"]);
      console.log("REGISTER SUCCESS:", res.data);
    } catch (err) {
      // Backend returned an error
      if (err.response) {
        console.error("Backend error:", err.response.data);
        setMessages([err.response.data.error || "Registration failed"]);
      } 
      // No response received
      else if (err.request) {
        console.error("No response received:", err.request);
        setMessages(["No response from server"]);
      } 
      // Other errors
      else {
        console.error("Error setting up request:", err.message);
        setMessages([err.message]);
      }
    }
  };

  return (
    <div className="single-login-form single-login-form-style single-login-form-2 js-validation-fields">
      <img className="login-icon" src="/img/user.png" alt="user icon" />
      <h2 className="simple-login-header">Create account!</h2>
      <form onSubmit={handleRegister}>
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>

        {/* Separate inputs for name and surname */}
        <input name="name" placeholder="First name" onChange={handleChange} required />
        <input name="surname" placeholder="Last name" onChange={handleChange} required />

        <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="location" type="text" placeholder="Location" onChange={handleChange} />

        <button type="submit" className="blue-button">Create</button>
      </form>
    </div>
  );
}

export default RegisterForm;
