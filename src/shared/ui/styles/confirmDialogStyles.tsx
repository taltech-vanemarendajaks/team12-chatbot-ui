import { styled } from "@mui/material/styles";

export const ConfirmOverlay = styled("div")({
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1300,
});

export const ConfirmBox = styled("div")(({ theme }) => ({
    backgroundColor: theme.vars!.palette.background.default,
    border: `1px solid ${theme.vars!.palette.border}`,
    borderRadius: "0.75rem",
    padding: "1.5rem",
    maxWidth: "400px",
    width: "90%",
}));

export const ConfirmTitle = styled("h3")(({ theme }) => ({
    margin: "0 0 0.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.vars!.palette.text.primary,
}));

export const ConfirmMessage = styled("p")(({ theme }) => ({
    margin: "0 0 1.25rem",
    fontSize: "0.875rem",
    color: theme.vars!.palette.text.secondary,
    lineHeight: 1.5,
}));

export const ConfirmActions = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
});

export const CancelButton = styled("button")(({ theme }) => ({
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: `1px solid ${theme.vars!.palette.border}`,
    backgroundColor: theme.vars!.palette.codeBg,
    color: theme.vars!.palette.text.primary,
    fontSize: "0.875rem",
    cursor: "pointer",
    fontFamily: "inherit",
    "&:hover": {
        backgroundColor: theme.vars!.palette.border,
    },
}));

export const ConfirmButton = styled("button")({
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    backgroundColor: "#dc2626",
    color: "white",
    fontSize: "0.875rem",
    cursor: "pointer",
    fontFamily: "inherit",
    "&:hover": {
        backgroundColor: "#b91c1c",
    },
});
