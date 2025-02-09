import api from "../config/api";

export const fetchBalance = async () => {
  try {
    const response = await api.get("/balance");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    throw error;
  }
};
