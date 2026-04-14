import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const InputWrapper = styled("div")({
    paddingBlock: "0.75rem",
});

export const InputBar = styled("div")<{ overLimit?: boolean }>(
    ({ overLimit }) => ({
        display: "flex",
        alignItems: "flex-end",
        gap: "0.5rem",
        backgroundColor: "var(--code-bg)",
        borderRadius: "1rem",
        padding: "0.5rem 1rem",
        border: "2px solid",
        borderColor: overLimit ? "#ef4444" : "transparent",
        transition: "border-color 0.2s",
    }),
);

export const InputTextarea = styled("textarea")({
    flex: 1,
    width: "100%",
    resize: "none",
    background: "transparent",
    outline: "none",
    color: "var(--text-h)",
    fontSize: "0.875rem",
    lineHeight: 1.625,
    maxHeight: "8rem",
    overflowY: "auto",
    fontFamily: "inherit",
    border: "none",
    padding: 0,
    textAlign: "left",
    "&::placeholder": {
        color: "var(--text)",
    },
});

export const CharCounter = styled("span")<{ overLimit?: boolean }>(
    ({ overLimit }) => ({
        fontSize: "0.75rem",
        color: overLimit ? "#ef4444" : "var(--text)",
        paddingTop: "0.25rem",
        display: "block",
        textAlign: "left",
        transition: "color 0.2s",
    }),
);

export const InputTextareaWrapper = styled("div")({
    flex: 1,
    minWidth: 0,
});

export const SendButton = styled(IconButton)<{ active?: boolean }>(
    ({ active }) => ({
        color: active ? "var(--accent)" : "var(--text)",
        "&:hover": {
            backgroundColor: "var(--accent-bg)",
        },
    }),
);

export const StopButton = styled(IconButton)({
    color: "#ef4444",
    "&:hover": {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
});
