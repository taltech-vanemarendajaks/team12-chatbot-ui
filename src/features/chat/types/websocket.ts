import type { Message } from "./message";

export type ChatWebSocketMessage =
    | { type: "SEND_MESSAGE"; conversationId: number; content: string }
    | { type: "STOP_GENERATION"; conversationId: number };

export type ChatWebSocketResponse =
    | { type: "CONFIG"; maxMessageLength: number }
    | { type: "MESSAGE"; message: Message }
    | { type: "WARNING"; text: string }
    | { type: "BLOCKED"; text: string }
    | { type: "STREAM_START"; conversationId: number }
    | { type: "STREAM_TOKEN"; token: string }
    | { type: "STREAM_END"; message: Message }
    | { type: "ERROR"; text: string };
