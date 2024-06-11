import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://cards-marketplace-api.onrender.com/",
});

export default api;
