import { get } from "../config/api";

// Fetch Transaction History
export const getHistory = async (offset: number, limit: number = 5) => {
  const response = await get("/history", { limit, offset });
  return response.data;
};
