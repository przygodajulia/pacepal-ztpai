// api/user.js
import axios from "axios";

const backendUrl = "http://localhost:5001";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getCurrentUser = () => axios.get(`${backendUrl}/user/me`, authHeader());
export const logout = () => localStorage.removeItem("token"); // simple logout
