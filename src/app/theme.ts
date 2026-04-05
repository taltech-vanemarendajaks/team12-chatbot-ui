import { createTheme } from "@mui/material/styles";

// Extend MUI theme to include custom palette properties
declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#1565c0",
    },
    error: {
      main: "#d32f2f",
      dark: "#c62828",
      light: "#ef5350",
      lighter: "#ffebee",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#6b7280",
    },
  },
  components: {
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
