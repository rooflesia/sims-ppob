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

export const fetchBanners = async () => {
  try {
    const response = await api.get("/banner");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    throw error;
  }
};
