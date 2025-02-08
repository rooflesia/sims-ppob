import api from "../config/api";

export const fetchTransactionHistory = async (offset: number, limit: number) => {
  try {
    const response = await api.get(`/transaction/history`, {
      params: { offset, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transaction history:", error);
    throw error;
  }
};
