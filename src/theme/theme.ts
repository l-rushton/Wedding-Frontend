import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F8F7F2',
    },
    secondary: {
      main: '#AACBB1',
    },
  },
  typography: {
    fontFamily: [
        'playfairDisplay',
    ].join(','),
  },
});

export default theme; 