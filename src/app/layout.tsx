'use client';

import { Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import Header from './header/header';
import { Box } from '@mui/material';
import Image from 'next/image';

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['serif'],
  preload: true,
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

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
            minHeight: '50vh',
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
              pb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                position: 'relative',
                width: { xs: '120px', sm: '150px', md: '180px' },
                height: { xs: '72px', sm: '90px', md: '108px' }
              }}>
                <Image 
                  src="/images/landi.png" 
                  alt="Landi" 
                  fill={true} 
                  style={{ objectFit: 'contain' }} 
                />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
