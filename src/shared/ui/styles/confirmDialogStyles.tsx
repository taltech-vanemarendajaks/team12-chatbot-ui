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

export const ConfirmBox = styled("div")({
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    maxWidth: "400px",
    width: "90%",
});

export const ConfirmTitle = styled("h3")({
    margin: "0 0 0.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text-h)",
});

export const ConfirmMessage = styled("p")({
    margin: "0 0 1.25rem",
    fontSize: "0.875rem",
    color: "var(--text)",
    lineHeight: 1.5,
});

export const ConfirmActions = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
});

export const CancelButton = styled("button")({
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "1px solid var(--border)",
    backgroundColor: "var(--code-bg)",
    color: "var(--text-h)",
    fontSize: "0.875rem",
    cursor: "pointer",
    fontFamily: "inherit",
    "&:hover": {
        backgroundColor: "var(--border)",
    },
});

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
