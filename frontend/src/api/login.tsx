import apiClient from "./apiClient";
import { User } from "../types/User";

export const fetchUsers = async (userData: {
  id: number;
  password: string;
}) => {
  const response = await apiClient.post("auth/login", userData);
  return response.data;
};
