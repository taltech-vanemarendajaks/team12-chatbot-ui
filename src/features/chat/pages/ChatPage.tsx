import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useState } from "react";

import type { Conversation } from "@/app/models/Conversation";
import {
    getActiveConversations,
    postConversation,
    deleteConversation,
} from "../api/chatApi";
import { getMessagesByConversation } from "../api/messageApi";
import { ConversationSidebar } from "../components/ConversationSidebar";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { Notification } from "../components/Notification";
import { useChatWebSocket } from "../hooks/useChatWebSocket";
import {
    ChatLayoutRoot,
    ChatAreaRoot,
    ChatPageInputWrapper,
    ConnectingRoot,
    ConnectingText,
    NoConversationRoot,
} from "../styles/chatPageStyles";

export function ChatPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<
        number | null
    >(null);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const {
        messages,
        setMessages,
        streamingContent,
        warning,
        error,
        sending,
        connected,
        maxMessageLength,
        sendMessage,
        resetChat,
    } = useChatWebSocket();

    // Load conversations on connect
    useEffect(() => {
        if (!connected) return;

        const load = async () => {
            try {
                const data = await getActiveConversations();
                setConversations(data);

                if (data.length > 0) {
                    setSelectedConversationId(data[0].id);
                }
            } catch (err) {
                console.error("Failed to fetch conversations:", err);
            }
        };

        load();
    }, [connected]);

    // Load messages when conversation changes
    useEffect(() => {
        if (selectedConversationId === null) {
            resetChat();

            return;
        }

        let cancelled = false;

        const fetchMessages = async () => {
            resetChat();
            setLoadingMessages(true);

            try {
                const data =
                    await getMessagesByConversation(selectedConversationId);

                if (!cancelled) {
                    setMessages(data);
                }
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            } finally {
                if (!cancelled) {
                    setLoadingMessages(false);
                }
            }
        };

        fetchMessages();

        return () => {
            cancelled = true;
        };
    }, [selectedConversationId, setMessages, resetChat]);

    const handleSelectConversation = useCallback(
        (id: number) => {
            if (id === selectedConversationId) return;
            setSelectedConversationId(id);
        },
        [selectedConversationId],
    );

    const handleCreateConversation = useCallback(async (title: string) => {
        try {
            const newConversation = await postConversation(title);
            setConversations((prev) => [newConversation, ...prev]);
            setSelectedConversationId(newConversation.id);
        } catch (err) {
            console.error("Failed to create conversation:", err);
        }
    }, []);

    const handleDeleteConversation = useCallback(
        async (id: number) => {
            try {
                await deleteConversation(id);
                setConversations((prev) => prev.filter((c) => c.id !== id));

                if (id === selectedConversationId) {
                    const remaining = conversations.filter(
                        (c) => c.id !== id,
                    );
                    setSelectedConversationId(
                        remaining.length > 0 ? remaining[0].id : null,
                    );
                }
            } catch (err) {
                console.error("Failed to delete conversation:", err);
            }
        },
        [selectedConversationId, conversations],
    );

    const handleSend = useCallback(
        (content: string) => {
            if (selectedConversationId === null) return;
            sendMessage(selectedConversationId, content);
        },
        [sendMessage, selectedConversationId],
    );

    if (!connected) {
        return (
            <ChatLayoutRoot>
                <ChatAreaRoot>
                    <ConnectingRoot>
                        <CircularProgress size={40} />
                        <ConnectingText>
                            Connecting to chat...
                        </ConnectingText>
                    </ConnectingRoot>
                </ChatAreaRoot>
            </ChatLayoutRoot>
        );
    }

    return (
        <ChatLayoutRoot>
            <ConversationSidebar
                conversations={conversations}
                selectedId={selectedConversationId}
                onSelect={handleSelectConversation}
                onCreate={handleCreateConversation}
                onDelete={handleDeleteConversation}
            />

            <ChatAreaRoot>
                {selectedConversationId === null ? (
                    <NoConversationRoot>
                        Select a conversation or create a new one
                    </NoConversationRoot>
                ) : (
                    <>
                        <MessageList
                            messages={messages}
                            loading={loadingMessages}
                            streamingContent={streamingContent}
                        />
                        <ChatPageInputWrapper>
                            <MessageInput
                                onSend={handleSend}
                                disabled={
                                    sending || streamingContent !== null
                                }
                                maxLength={maxMessageLength}
                            />
                        </ChatPageInputWrapper>
                    </>
                )}

                <Notification message={warning} severity="warning" />
                <Notification message={error} severity="error" />
            </ChatAreaRoot>
        </ChatLayoutRoot>
    );
}
