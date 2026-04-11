import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const InputWrapper = styled("div")({
    paddingBlock: "0.75rem",
});

export const InputBar = styled("div")<{ overLimit?: boolean }>(
    ({ theme, overLimit }) => ({
        display: "flex",
        alignItems: "flex-end",
        gap: "0.5rem",
        backgroundColor: theme.vars!.palette.codeBg,
        borderRadius: "1rem",
        padding: "0.5rem 1rem",
        border: "2px solid",
        borderColor: overLimit ? "#ef4444" : "transparent",
        transition: "border-color 0.2s",
    }),
);

export const InputTextarea = styled("textarea")(({ theme }) => ({
    flex: 1,
    width: "100%",
    resize: "none",
    background: "transparent",
    outline: "none",
    color: theme.vars!.palette.text.primary,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    maxHeight: "8rem",
    overflowY: "auto",
    fontFamily: "inherit",
    border: "none",
    padding: 0,
    textAlign: "left",
    "&::placeholder": {
        color: theme.vars!.palette.text.secondary,
    },
}));

export const CharCounter = styled("span")<{ overLimit?: boolean }>(
    ({ theme, overLimit }) => ({
        fontSize: "0.75rem",
        color: overLimit ? "#ef4444" : theme.vars!.palette.text.secondary,
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
    ({ theme, active }) => ({
        color: active ? theme.vars!.palette.secondary.main : theme.vars!.palette.text.secondary,
        "&:hover": {
            backgroundColor: theme.vars!.palette.accentBg,
        },
    }),
);
