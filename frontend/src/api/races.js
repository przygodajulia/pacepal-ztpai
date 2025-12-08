import axios from "axios";

const backendUrl = "http://localhost:5001";

// Helper to attach JWT
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllRaces = () =>
  axios.get(`${backendUrl}/races`, authHeader());

export const getRaceById = (id) =>
  axios.get(`${backendUrl}/races/${id}`, authHeader());

export const signUpForRace = (raceId) =>
  axios.post(`${backendUrl}/races/${raceId}/signup`, {}, authHeader());