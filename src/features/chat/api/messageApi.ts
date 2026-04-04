import type { Message } from "../types/message";

import { apiClient } from "@/shared/ui/services/apiClient";

import { messageEndpoints } from "./endpoints";

export async function getMessagesByConversation(
    conversationId: number,
): Promise<Message[]> {
    const response = await apiClient.get<Message[]>(
        messageEndpoints.getMessagesByConversationId(conversationId),
    );

    return response.data;
}
