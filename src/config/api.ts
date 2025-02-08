import axios from "axios";

// Instance Axios
const api = axios.create({
  baseURL: "https://api-doc-tht.nutech-integrasi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani response error
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (status === 403) {
        console.error("Akses ditolak.");
      } else if (status >= 500) {
        console.error("Kesalahan server.");
      }
    } else if (error.request) {
      console.error("Server tidak merespons. Periksa koneksi Anda.");
    } else {
      console.error("Terjadi kesalahan:", error.message);
    }
    return Promise.reject(error);
  }
);

// Helper Methods
export const get = (url: string, params?: any) => api.get(url, { params });
export const post = (url: string, data?: any) => api.post(url, data);
export const put = (url: string, data?: any) => api.put(url, data);
export const del = (url: string) => api.delete(url);

export default api;
