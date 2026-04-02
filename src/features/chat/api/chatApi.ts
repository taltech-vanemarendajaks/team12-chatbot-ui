import { apiClient } from "@/shared/ui/services/apiClient";
import { userEndpoints, conversationEndpoints, messageEndpoints } from "./endpoints";
import type { Conversation } from "@/app/models/Conversation";
import type { Message } from "@/app/models/Message";

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

export async function postConversation(title: string): Promise<Conversation> {
  const response = await apiClient.post<Conversation>(
    conversationEndpoints.postConversation, {
      title
    }
  );
  return response.data;
}

export async function getMessagesByConversationId(conversationId: number): Promise<any> {  // TODO: Message model
  const response = await apiClient.get<any[]>( // TODO: Message model
    messageEndpoints.getMessagesByConversationId(conversationId)
  );
  return response.data;
}

export async function postMessage(conversationId: number, role: string, content: string): Promise<any> { // TODO: Message model
  const response = await apiClient.post<any>( // TODO: Message model
    messageEndpoints.postMessage, {
      conversationId, role, content
    }
  );
  return response.data;
}