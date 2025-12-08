import axios from "axios";

const backendUrl = "http://localhost:5001";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

// Fetch all races the logged-in user is registered for
export const getMyRaces = () => axios.get(`${backendUrl}/my_races`, authHeader());
