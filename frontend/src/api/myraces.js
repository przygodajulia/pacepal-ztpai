import axios from "axios";

const backendUrl = "http://localhost:5001";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

// Fetch all races for register user
export const getMyRaces = () => axios.get(`${backendUrl}/my_races`, authHeader());
