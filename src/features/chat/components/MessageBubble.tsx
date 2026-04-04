import type { Message } from "../types/message";
import { MessageRole } from "../types/message";
import { formatDateTime } from "@/shared/ui/formatDateTime";

import {
    BubbleContent,
    BubbleRow,
    BubbleText,
    BubbleTime,
    StreamingCursor,
} from "../styles/messageBubbleStyles";

type MessageBubbleProps = {
    message: Message;
    isStreaming?: boolean;
};

export function MessageBubble({
    message,
    isStreaming = false,
}: MessageBubbleProps) {
    const isUser = message.role === MessageRole.USER;

    return (
        <BubbleRow isUser={isUser}>
            <BubbleContent isUser={isUser} severity={message.severity}>
                <BubbleText>
                    {message.content}
                    {isStreaming && <StreamingCursor>|</StreamingCursor>}
                </BubbleText>

                {!isStreaming && (
                    <BubbleTime isUser={isUser} severity={message.severity}>
                        {formatDateTime(message.createdAt)}
                    </BubbleTime>
                )}
            </BubbleContent>
        </BubbleRow>
    );
}
