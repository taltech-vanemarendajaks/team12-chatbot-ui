import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const SidebarRoot = styled("aside")<{ collapsed?: boolean }>(
    ({ collapsed }) => ({
        width: collapsed ? "48px" : "280px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid var(--border)",
        backgroundColor: "var(--bg)",
        height: "100svh",
        overflow: "hidden",
        transition: "width 0.2s ease",
    }),
);

export const SidebarHeader = styled("div")<{ collapsed?: boolean }>(
    ({ collapsed }) => ({
        padding: "0.75rem 1rem",
        borderBottom: collapsed ? "none" : "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    }),
);

export const SidebarTitle = styled("h2")({
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text-h)",
    margin: 0,
});

export const SidebarList = styled("div")({
    flex: 1,
    overflowY: "auto",
    padding: "0.5rem",
});

export const SidebarItem = styled("button")<{ selected?: boolean }>(
    ({ selected }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        textAlign: "left" as const,
        padding: "0.625rem 0.75rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        backgroundColor: selected ? "var(--accent-bg)" : "transparent",
        color: selected ? "var(--accent)" : "var(--text-h)",
        fontWeight: selected ? 600 : 400,
        fontSize: "0.875rem",
        transition: "background-color 0.15s, color 0.15s",
        "&:hover": {
            backgroundColor: selected ? "var(--accent-bg)" : "var(--code-bg)",
        },
    }),
);

export const SidebarItemInfo = styled("div")({
    flex: 1,
    minWidth: 0,
});

export const SidebarItemTitle = styled("span")({
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
});

export const SidebarItemTime = styled("span")({
    display: "block",
    fontSize: "0.75rem",
    color: "var(--text)",
    marginTop: "0.125rem",
});

export const SidebarEmpty = styled("p")({
    padding: "1rem",
    textAlign: "center" as const,
    color: "var(--text)",
    fontSize: "0.875rem",
});

export const SidebarCreateForm = styled("div")({
    padding: "0.75rem",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    gap: "0.5rem",
});

export const SidebarInput = styled("input")({
    flex: 1,
    padding: "0.375rem 0.625rem",
    borderRadius: "0.375rem",
    border: "1px solid var(--border)",
    backgroundColor: "var(--code-bg)",
    color: "var(--text-h)",
    fontSize: "0.8125rem",
    fontFamily: "inherit",
    outline: "none",
    "&::placeholder": {
        color: "var(--text)",
    },
});

export const SidebarIconButton = styled(IconButton)({
    color: "var(--text-h)",
});

export const SidebarAddButton = styled(IconButton)({
    color: "var(--accent)",
    marginLeft: "auto",
});

export const SidebarDeleteButton = styled(IconButton)({
    color: "var(--text)",
    opacity: 0.5,
    "&:hover": {
        opacity: 1,
        color: "#dc2626",
    },
});

