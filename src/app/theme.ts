import { createTheme } from "@mui/material/styles";

// Extend MUI theme to include custom palette properties
declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
  interface Palette {
    codeBg: string;
    border: string;
    accentBg: string;
  }
  interface PaletteOptions {
    codeBg?: string;
    border?: string;
    accentBg?: string;
  }
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "media",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#aa3bff" },
        error: {
          main: "#d32f2f",
          dark: "#c62828",
          light: "#ef5350",
          lighter: "#ffebee",
        },
        background: {
          default: "#ffffff",
          paper: "#f5f7fa",
        },
        text: {
          primary: "#08060d",
          secondary: "#6b6375",
        },
        divider: "#e5e4e7",
        codeBg: "#f4f3ec",
        border: "#e5e4e7",
        accentBg: "rgba(170, 59, 255, 0.1)",
      },
    },
    dark: {
      palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#c084fc" },
        error: {
          main: "#d32f2f",
          dark: "#c62828",
          light: "#ef5350",
          lighter: "#ffebee",
        },
        background: {
          default: "#16171d",
          paper: "#1f2028",
        },
        text: {
          primary: "#f3f4f6",
          secondary: "#9ca3af",
        },
        divider: "#2e303a",
        codeBg: "#1f2028",
        border: "#2e303a",
        accentBg: "rgba(192, 132, 252, 0.15)",
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        code: {
          fontFamily: "ui-monospace, Consolas, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
          display: "inline-flex",
          borderRadius: "4px",
          color: theme.vars!.palette.text.primary,
          fontSize: "15px",
          lineHeight: "135%",
          padding: "4px 8px",
          background: theme.vars!.palette.codeBg,
        },
        "h1, h2": {
          color: theme.vars!.palette.text.primary,
        },
      }),
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1565c0",
          color: "#ffffff",
        },
      },
    },
  },
});

export default theme;
