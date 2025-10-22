import axios from "axios";

const BASE_URL = "https://our-voice-our-rights.onrender.com/";

// Get list of districts
export const getDistricts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/districts`);
    return res.data;
  } catch (err) {
    console.error("Error fetching districts:", err);
    return [];
  }
};

// Get performance data for a district
export const getPerformance = async (districtCode) => {
  try {
    const res = await axios.get(`${BASE_URL}/performance/${districtCode}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching performance:", err);
    return [];
  }
};

export const getComparison = async (districtId) => {
  try {
    const res = await axios.get(`${BASE_URL}/compare/${districtId}`); // <- correct path
    console.log(res.data)
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) return []; // handle missing data
    throw err;
  }
};
