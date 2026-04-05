import { apiClient } from "@/shared/ui/services/apiClient";
import { userEndpoints } from "./endpoints";

export type User = {
  id: number;
  name: string;
};

export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>(
    userEndpoints.getUsers
  );
  return response.data;
}