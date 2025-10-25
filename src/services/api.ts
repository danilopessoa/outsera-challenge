import axios, { type AxiosInstance } from "axios";
const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "";

export const httpClient = () => {
  const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const get = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
    const response = await api.get<T>(endpoint, { params });
    return response.data;
  };

  return { get };
};
