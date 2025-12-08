import axios from "axios";

const backendUrl = "http://localhost:5001";

export const loginUser = (email, password) =>
  axios.post(`${backendUrl}/auth/login`, { email, password });

export const registerUser = (data) =>
  axios.post(`${backendUrl}/auth/register-user`, data);
