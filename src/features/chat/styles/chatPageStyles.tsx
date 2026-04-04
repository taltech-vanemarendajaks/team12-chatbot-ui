import { styled } from "@mui/material/styles";

export const ChatLayoutRoot = styled("div")({
    display: "flex",
    height: "100svh",
});

export const ChatAreaRoot = styled("div")({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "100svh",
    borderRight: "1px solid var(--border)",
});

export const ChatPageInputWrapper = styled("div")({
    width: "100%",
    maxWidth: "48rem",
    marginInline: "auto",
    paddingInline: "1rem",
    paddingBottom: "1rem",
});

export const ConnectingRoot = styled("div")({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    color: "var(--text)",
});

export const ConnectingText = styled("p")({
    fontSize: "0.875rem",
});

export const NoConversationRoot = styled("div")({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text)",
    fontSize: "1.125rem",
});
