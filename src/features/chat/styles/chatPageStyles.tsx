import { styled } from "@mui/material/styles";

export const ChatLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    height: "100svh",
    background: theme.vars!.palette.background.default,
    color: theme.vars!.palette.text.secondary,
}));

export const ChatAreaRoot = styled("div")(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "100svh",
    borderRight: `1px solid ${theme.vars!.palette.border}`,
}));

export const ChatPageInputWrapper = styled("div")({
    width: "100%",
    maxWidth: "48rem",
    marginInline: "auto",
    paddingInline: "1rem",
    paddingBottom: "1rem",
});

export const ConnectingRoot = styled("div")(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    color: theme.vars!.palette.text.secondary,
}));

export const ConnectingText = styled("p")({
    fontSize: "0.875rem",
});

export const NoConversationRoot = styled("div")(({ theme }) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.vars!.palette.text.secondary,
    fontSize: "1.125rem",
}));
