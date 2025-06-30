import axios from "axios";

export const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
); 