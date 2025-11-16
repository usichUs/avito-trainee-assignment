import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

console.log("API Base URL:", API_BASE_URL);

// Обработка ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
