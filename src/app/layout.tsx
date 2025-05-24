'use client';

import { Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import Header from './header/header';
import { Box } from '@mui/material';
import ForestFloorArt from './components/ForestFloorArt';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={playfairDisplay.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ 
            bgcolor: 'primary.main',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Header />
            <Box sx={{ flex: 1 }}>
              {children}
            </Box>
            <Box sx={{ 
              width: '100%', 
              position: 'relative',
              mt: 'auto',
              pb: 2
            }}>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
