import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fef3e2',
    },
    secondary: {
      main: '#365236',
    },
  },
  typography: {
    fontFamily: 'var(--font-playfair)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          backgroundColor: '#fef3e2',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFeatureSettings: '"liga" 1, "dlig" 1, "hist" 1',
        },
      },
    },
  },
});

export default theme; 