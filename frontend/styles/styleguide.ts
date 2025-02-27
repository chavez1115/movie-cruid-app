import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2bd17e",
    },
    secondary: {
      main: "#092c39",
      light: "#224957",
    },
    background: {
      default: "#093545",
    },
    error: {
      main: "#eb5757",
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontSize: '64px',
      lineHeight: '80px',
      letterSpacing: '0%',
    },
    h2: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '0%',
    },
    h3: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '0%',
    },
    h4: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0%',
    },
    h5: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0%',
    },
    h6: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0%',
    },
    body1: {
      fontSize: '20px',
      lineHeight: '32px',
      letterSpacing: '0%',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0%',
    },
    caption: {
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '0%',
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
