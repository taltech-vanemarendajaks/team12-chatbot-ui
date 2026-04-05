import { apiClient } from "@/shared/ui/services/apiClient";
import { userEndpoints, conversationEndpoints } from "./endpoints";
import type { Conversation } from "@/app/models/Conversation";

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

export async function getAllConversations(): Promise<Conversation[]> {
  const response = await apiClient.get<Conversation[]>(
    conversationEndpoints.getAllConversations
  );
  return response.data;
}

export async function getActiveConversations(): Promise<Conversation[]> {
  const response = await apiClient.get<Conversation[]>(
    conversationEndpoints.getAllActiveConversations
  );
  return response.data;
}

export async function postConversation(title: string): Promise<Conversation> {
  const response = await apiClient.post<Conversation>(
    conversationEndpoints.postConversation, {
      title
    }
  );
  return response.data;
}

export async function deleteConversation(id: number): Promise<void> {
  await apiClient.delete(conversationEndpoints.getConversationById(id));
}
