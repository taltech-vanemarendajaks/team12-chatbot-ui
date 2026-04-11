import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const SidebarRoot = styled("aside")<{ collapsed?: boolean }>(
    ({ theme, collapsed }) => ({
        width: collapsed ? "48px" : "280px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderLeft: `1px solid ${theme.vars!.palette.border}`,
        backgroundColor: theme.vars!.palette.background.default,
        height: "100svh",
        overflow: "hidden",
        transition: "width 0.2s ease",
    }),
);

export const SidebarHeader = styled("div")<{ collapsed?: boolean }>(
    ({ theme, collapsed }) => ({
        padding: "0.75rem 1rem",
        borderBottom: collapsed ? "none" : `1px solid ${theme.vars!.palette.border}`,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    }),
);

export const SidebarTitle = styled("h2")(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.vars!.palette.text.primary,
    margin: 0,
}));

export const SidebarList = styled("div")({
    flex: 1,
    overflowY: "auto",
    padding: "0.5rem",
});

export const SidebarItem = styled("button")<{ selected?: boolean }>(
    ({ theme, selected }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        textAlign: "left" as const,
        padding: "0.625rem 0.75rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        backgroundColor: selected ? theme.vars!.palette.accentBg : "transparent",
        color: selected ? theme.vars!.palette.secondary.main : theme.vars!.palette.text.primary,
        fontWeight: selected ? 600 : 400,
        fontSize: "0.875rem",
        transition: "background-color 0.15s, color 0.15s",
        "&:hover": {
            backgroundColor: selected ? theme.vars!.palette.accentBg : theme.vars!.palette.codeBg,
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

export const SidebarItemTime = styled("span")(({ theme }) => ({
    display: "block",
    fontSize: "0.75rem",
    color: theme.vars!.palette.text.secondary,
    marginTop: "0.125rem",
}));

export const SidebarEmpty = styled("p")(({ theme }) => ({
    padding: "1rem",
    textAlign: "center" as const,
    color: theme.vars!.palette.text.secondary,
    fontSize: "0.875rem",
}));

export const SidebarCreateForm = styled("div")(({ theme }) => ({
    padding: "0.75rem",
    borderBottom: `1px solid ${theme.vars!.palette.border}`,
    display: "flex",
    gap: "0.5rem",
}));

export const SidebarInput = styled("input")(({ theme }) => ({
    flex: 1,
    padding: "0.375rem 0.625rem",
    borderRadius: "0.375rem",
    border: `1px solid ${theme.vars!.palette.border}`,
    backgroundColor: theme.vars!.palette.codeBg,
    color: theme.vars!.palette.text.primary,
    fontSize: "0.8125rem",
    fontFamily: "inherit",
    outline: "none",
    "&::placeholder": {
        color: theme.vars!.palette.text.secondary,
    },
}));

export const SidebarIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.vars!.palette.text.primary,
}));

export const SidebarAddButton = styled(IconButton)(({ theme }) => ({
    color: theme.vars!.palette.secondary.main,
    marginLeft: "auto",
}));

export const SidebarDeleteButton = styled(IconButton)(({ theme }) => ({
    color: theme.vars!.palette.text.secondary,
    opacity: 0.5,
    "&:hover": {
        opacity: 1,
        color: "#dc2626",
    },
}));
