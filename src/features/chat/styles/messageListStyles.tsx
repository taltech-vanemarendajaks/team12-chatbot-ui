import { styled } from "@mui/material/styles";

export const MessageListRoot = styled("div")({
    flex: 1,
    overflowY: "auto",
});

export const MessageListInner = styled("div")({
    maxWidth: "48rem",
    marginInline: "auto",
    padding: "1rem",
});

export const MessageListEmpty = styled("div")(({ theme }) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.vars!.palette.text.secondary,
}));

export const MessageListEmptyText = styled("p")({
    fontSize: "1.125rem",
});
