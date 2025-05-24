'use client';

import { Container, Typography, Box } from '@mui/material';
import Image from 'next/image';
import Countdown from './components/Countdown';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        pt: 4,
        gap: 6
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 4,
          pt: 4,
          pb: 4
        }}>
          <Typography 
            variant="h1" 
            component="div"
            sx={{ textAlign: 'left'}}
          >
            We're getting married!
          </Typography>

          
          {/* <Typography 
            variant="h3" 
            component="div"
            sx={{ textAlign: 'center' }}
          >
            getting
          </Typography>
          <Typography 
            variant="h2" 
            component="div"
            sx={{ textAlign: 'right', pr: '30%' }}
          >
            married!
          </Typography> */}
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          gap: { xs: 4, md: 8 },
          pb: 0,
          pt: 0,
          px: 0
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Box sx={{ display: 'flex', gap: 8 }}>
              <Box>
                <Typography sx={{ mb: 2 }}>
                  WHERE
                </Typography>
                <Typography variant="h5">
                  Ufton Court
                </Typography>
                <Typography variant="h5">
                  Green Lane
                </Typography>
                <Typography variant="h5">
                  Reading
                </Typography>
                <Typography variant="h5">
                  RG7 1JG
                </Typography>
              </Box>
              
              <Box>
                <Typography sx={{ mb: 2 }}>
                  WHEN
                </Typography>
                <Typography variant="h5">
                  12:00
                </Typography>
                <Typography variant="h5">
                  18 October 2025
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography  sx={{ textAlign: 'center', mb: 2 }}>
                See you in:
              </Typography>
              <Countdown />
            </Box>
          </Box>
        
          <Box sx={{ 
            flex: 1,
            position: 'relative',
            height: { xs: '300px', sm: '400px', md: '500px' },
            borderRadius: 0,
            overflow: 'hidden'
          }}>
            <Image 
              src="/images/izzylouisbench.jpg" 
              alt="Izzy & Louis at Ufton Court" 
              fill={true} 
              style={{ objectFit: 'cover' }} 
              priority
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
