import { keyframes, styled, type Theme } from "@mui/material/styles";

import type { MessageSeverity } from "../types/message";

type BubbleContentProps = {
    isUser: boolean;
    severity?: MessageSeverity;
};

function getBubbleBackground(theme: Theme, isUser: boolean, severity?: MessageSeverity) {
    if (severity === "HIGH") return "#dc2626";
    if (severity === "LOW") return "#d97706";
    if (isUser) return theme.vars!.palette.secondary.main;

    return theme.vars!.palette.codeBg;
}

export const BubbleRow = styled("div")<{ isUser: boolean }>(({ isUser }) => ({
    display: "flex",
    justifyContent: isUser ? "flex-end" : "flex-start",
    marginBottom: "0.75rem",
}));

export const BubbleContent = styled("div")<BubbleContentProps>(
    ({ theme, isUser, severity }) => ({
        maxWidth: "70%",
        borderRadius: "1rem",
        padding: "0.625rem 1rem",
        backgroundColor: getBubbleBackground(theme, isUser, severity),
        color: isUser || severity ? "white" : theme.vars!.palette.text.primary,
        ...(isUser
            ? { borderBottomRightRadius: "0.25rem" }
            : { borderBottomLeftRadius: "0.25rem" }),
    }),
);

export const BubbleText = styled("p")({
    fontSize: "0.875rem",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
});

export const BubbleTime = styled("p")<{ isUser: boolean; severity?: MessageSeverity }>(
    ({ theme, isUser, severity }) => ({
        fontSize: "10px",
        marginTop: "0.25rem",
        textAlign: isUser ? ("right" as const) : ("left" as const),
        ...(isUser || severity
            ? { color: "rgba(255, 255, 255, 0.7)" }
            : { color: theme.vars!.palette.text.secondary }),
    }),
);

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
`;

export const StreamingCursor = styled("span")({
    animation: `${blink} 1s step-end infinite`,
    marginLeft: "1px",
    fontWeight: "bold",
});
