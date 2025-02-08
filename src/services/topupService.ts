import api from "../config/api";

export const performTopUp = async (amount: number) => {
  try {
    const response = await api.post("/topup", { top_up_amount: amount });
    return response.data;
  } catch (error) {
    console.error("Failed to perform top-up:", error);
    throw error;
  }
};

export const performTransaction = async (serviceCode: string) => {
  try {
    const response = await api.post("/transaction", { serviceCode });
    return response.data;
  } catch (error) {
    console.error("Failed to perform Transaction:", error);
    throw error;
  }
};
