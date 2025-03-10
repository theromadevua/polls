import axios from "axios";

// const accessToken =
//   typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  // headers: {
  //   // "Content-Type": "application/json",
  //   ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  // },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
