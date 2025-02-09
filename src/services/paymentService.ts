import api from "../config/api";

export const fetchServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error;
  }
};

export const processPayment = async (serviceId: number) => {
  try {
    const response = await api.post("/transaction", { service_code: serviceId });
    return response.data;
  } catch (error) {
    console.error("Failed to process payment:", error);
    throw error;
  }
};
