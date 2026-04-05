import { useEffect, useMemo, useRef } from "react";

import type { Message } from "../types/message";
import { MessageRole } from "../types/message";

import {
    MessageListEmpty,
    MessageListEmptyText,
    MessageListInner,
    MessageListRoot,
} from "../styles/messageListStyles";

import { MessageBubble } from "./MessageBubble";

type MessageListProps = {
    messages: Message[];
    loading: boolean;
    streamingContent: string | null;
};

export function MessageList({
    messages,
    loading,
    streamingContent,
}: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    const streamingMessage: Message | null = useMemo(
        () =>
            streamingContent !== null
                ? {
                      id: -1,
                      conversationId: 0,
                      role: MessageRole.BOT,
                      content: streamingContent,
                      isActive: true,
                      createdAt: new Date().toISOString(),
                      createdBy: 0,
                  }
                : null,
        [streamingContent],
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamingContent]);

    if (loading) {
        return <MessageListEmpty>Loading messages...</MessageListEmpty>;
    }

    if (messages.length === 0 && streamingContent === null) {
        return (
            <MessageListEmpty>
                <MessageListEmptyText>
                    Start a conversation with Bossbot!
                </MessageListEmptyText>
            </MessageListEmpty>
        );
    }

    return (
        <MessageListRoot>
            <MessageListInner>
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}

                {streamingMessage && (
                    <MessageBubble
                        key="streaming"
                        message={streamingMessage}
                        isStreaming
                    />
                )}

                <div ref={bottomRef} />
            </MessageListInner>
        </MessageListRoot>
    );
}
