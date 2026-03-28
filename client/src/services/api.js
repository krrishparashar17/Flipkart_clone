import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://flipkart-clone-api-ksfu.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;