export const MessageRole = {
    USER: "USER",
    BOT: "BOT",
} as const;

export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];

export const MessageSeverity = {
    LOW: "LOW",
    HIGH: "HIGH",
} as const;

export type MessageSeverity =
    (typeof MessageSeverity)[keyof typeof MessageSeverity];

export type Message = {
    id: number;
    conversationId: number;
    role: MessageRole;
    content: string;
    isActive: boolean;
    createdAt: string;
    createdBy: number;
    severity?: MessageSeverity;
};
