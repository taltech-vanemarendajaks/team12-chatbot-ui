import { useCallback, useEffect, useRef, useState } from "react";

import type { Message, MessageSeverity } from "../types/message";
import { MessageRole } from "../types/message";
import type {
    ChatWebSocketMessage,
    ChatWebSocketResponse,
} from "../types/websocket";

const MAX_RECONNECT_DELAY = 30_000;

function getWsUrl(): string {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.host}/ws/chat`;
}

function tagLastUserMessage(
    setter: React.Dispatch<React.SetStateAction<Message[]>>,
    severity: MessageSeverity,
) {
    setter((prev) => {
        let lastIdx = -1;

        for (let i = prev.length - 1; i >= 0; i--) {
            if (prev[i].role === MessageRole.USER) {
                lastIdx = i;
                break;
            }
        }

        if (lastIdx === -1) return prev;

        const updated = [...prev];
        updated[lastIdx] = { ...updated[lastIdx], severity };

        return updated;
    });
}

export function useChatWebSocket() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [streamingContent, setStreamingContent] = useState<string | null>(
        null,
    );
    const [warning, setWarning] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [connected, setConnected] = useState(false);
    const [maxMessageLength, setMaxMessageLength] = useState<number | null>(
        null,
    );

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectAttemptRef = useRef(0);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
    const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rateLimitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

    const connect = useCallback(() => {
        const ws = new WebSocket(getWsUrl());

        ws.onopen = () => {
            setConnected(true);
            setError(null);
            reconnectAttemptRef.current = 0;
        };

        ws.onmessage = (event) => {
            const response: ChatWebSocketResponse = JSON.parse(event.data);

            switch (response.type) {
                case "CONFIG":
                    setMaxMessageLength(response.maxMessageLength);
                    break;

                case "MESSAGE":
                    setMessages((prev) => [...prev, response.message]);
                    setSending(false);
                    break;

                case "WARNING":
                    tagLastUserMessage(setMessages, "LOW");
                    setWarning(response.text);
                    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
                    warningTimerRef.current = setTimeout(() => setWarning(null), 5000);
                    break;

                case "BLOCKED":
                    tagLastUserMessage(setMessages, "HIGH");
                    setError(response.text);
                    setSending(false);
                    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
                    errorTimerRef.current = setTimeout(() => setError(null), 5000);
                    break;

                case "STREAM_START":
                    setStreamingContent("");
                    break;

                case "STREAM_TOKEN":
                    setStreamingContent((prev) =>
                        prev !== null ? prev + response.token : response.token,
                    );
                    break;

                case "STREAM_END":
                    setStreamingContent(null);
                    if (response.message) {
                        setMessages((prev) => [...prev, response.message]);
                    }
                    setSending(false);
                    break;

                case "ERROR":
                    setError(response.text);
                    setSending(false);
                    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
                    errorTimerRef.current = setTimeout(() => setError(null), 5000);
                    break;

                case "RATE_LIMITED":
                    setSending(false);
                    setRateLimitedUntil(Date.now() + response.retryAfterMs);
                    setWarning(`Too many messages. Please wait ${Math.ceil(response.retryAfterMs / 1000)}s.`);
                    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
                    warningTimerRef.current = setTimeout(() => setWarning(null), response.retryAfterMs + 500);
                    if (rateLimitTimerRef.current) clearTimeout(rateLimitTimerRef.current);
                    rateLimitTimerRef.current = setTimeout(() => setRateLimitedUntil(null), response.retryAfterMs);
                    break;
            }
        };

        ws.onclose = () => {
            setConnected(false);
            wsRef.current = null;

            // Reconnect with exponential backoff
            const delay = Math.min(
                1000 * Math.pow(2, reconnectAttemptRef.current),
                MAX_RECONNECT_DELAY,
            );

            reconnectAttemptRef.current += 1;
            reconnectTimerRef.current = setTimeout(connect, delay);
        };

        ws.onerror = () => {
            // onclose will fire after this, handling reconnection
        };

        wsRef.current = ws;
    }, []);

    useEffect(() => {
        connect();

        return () => {
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }

            if (warningTimerRef.current) {
                clearTimeout(warningTimerRef.current);
            }

            if (errorTimerRef.current) {
                clearTimeout(errorTimerRef.current);
            }

            if (rateLimitTimerRef.current) {
                clearTimeout(rateLimitTimerRef.current);
            }

            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [connect]);

    const sendMessage = useCallback(
        (conversationId: number, content: string) => {
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
                setError("Not connected to server");
                if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
                errorTimerRef.current = setTimeout(() => setError(null), 3000);

                return;
            }

            setSending(true);

            const msg: ChatWebSocketMessage = {
                type: "SEND_MESSAGE",
                conversationId,
                content,
            };

            wsRef.current.send(JSON.stringify(msg));
        },
        [],
    );

    const stopGeneration = useCallback(
        (conversationId: number) => {
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

            const msg: ChatWebSocketMessage = {
                type: "STOP_GENERATION",
                conversationId,
            };

            wsRef.current.send(JSON.stringify(msg));
        },
        [],
    );

    const resetChat = useCallback(() => {
        setMessages([]);
        setStreamingContent(null);
        setSending(false);
        setWarning(null);
        setError(null);
    }, []);

    return {
        messages,
        setMessages,
        streamingContent,
        warning,
        error,
        sending,
        connected,
        maxMessageLength,
        sendMessage,
        stopGeneration,
        resetChat,
        rateLimitedUntil,
    };
}
