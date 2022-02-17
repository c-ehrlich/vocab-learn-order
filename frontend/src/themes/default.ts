import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#fff6e1',
    },
    primary: {
      main: orange[100],
      light: '#ffe6c1',
      dark: 'b29c7c',
    },
    secondary: {
      main: orange[600],
      light: '#fba333',
      dark: 'af6200',
    },
  },
})