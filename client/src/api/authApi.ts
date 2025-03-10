import api from "@/api/api";


export const loginRequest = async (credentials: { email: string; password: string }) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const registerRequest = async (credentials: { username: string; email: string; password: string }) => {
  const { data } = await api.post("/auth/registration", credentials);
  return data;
};

export const refreshRequest = async () => {
  const { data } = await api.post("/auth/refresh");
  return data;
};

export const updateUserRequest = async (userData: {username?: string, email?: string, avatar?: any}) => {
  const { data } = await api.post("/auth/updateUser", userData);
  return data;
};

export const logoutRequest = async () => {
  await api.delete("/auth/logout");
};