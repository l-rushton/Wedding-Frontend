'use client';

import { Container, Typography, Box, Button, Paper } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
We're getting married!
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          18th October 2025
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Ufton Court
        </Typography>
        <Box sx={{ 
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            height: { xs: '300px', sm: '400px', md: '500px' },
            borderRadius: 0 ,
            overflow: 'hidden'
        }}>
        <Image src="/images/izzylouisbench.jpg" alt="Izzy & Louis at Ufton Court" fill={true} style={{ objectFit: 'cover' }} />
        </Box>
      </Box>
    </Container>
  );
}
