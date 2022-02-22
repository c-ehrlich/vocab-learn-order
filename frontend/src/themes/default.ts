import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

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

// export const COLOR_LIGHT = '#faf9f4'; // this is what the reference used
export const COLOR_LIGHT = '#f3ede7';
export const COLOR_MID = '#f4e3d1';
export const COLOR_NOT_QUITE_DARK = '#7E997A'
export const COLOR_DARK = '#607262';
export const COLOR_VERY_DARK = '#505d51';
const DONT_USE_THIS_COLOR = '#ff0000';

export const defaultTheme = createTheme({
  palette: {
    background: {
      default: COLOR_MID,
    },
    primary: {
      main: COLOR_MID,
      light: COLOR_LIGHT,
      dark: COLOR_DARK,
      contrastText: COLOR_VERY_DARK,
    },
    secondary: {
      main: DONT_USE_THIS_COLOR,
      light: DONT_USE_THIS_COLOR,
      dark: DONT_USE_THIS_COLOR,
      contrastText: DONT_USE_THIS_COLOR,
    },
    action: {
      hoverOpacity: 0.1,
    },

  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_DARK,
          color: COLOR_MID,
          borderColor: COLOR_DARK,
          '&:hover': {
            color: COLOR_MID,
            backgroundColor: COLOR_VERY_DARK,
            borderColor: COLOR_VERY_DARK,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_LIGHT,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_LIGHT,
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: COLOR_NOT_QUITE_DARK,
        }
      }
    },
  //   MuiChip: {
  //     styleOverrides: {
  //       root: {
  //         color: "#af6200",
  //         borderColor: "#af6200",
  //       }
  //     }
  //   },
    MuiLink: {
      styleOverrides: {
        root: {
          color: COLOR_DARK,
        }
      }
    }
  },
});
