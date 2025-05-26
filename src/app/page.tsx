'use client';

import { Container, Typography, Box } from '@mui/material';
import Image from 'next/image';
import Countdown from './components/Countdown';
import PageFade from './components/PageFade';

export default function Home() {
  return (
    <PageFade>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        pt:  { xs: 0, md: 0 },
        gap:  { xs: 0, md: 4 }
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
            sx={{ 
              textAlign:  { xs: 'center', md: 'left' },
              fontSize: { xs: '3rem', md: '5rem' },
              pt: { xs: 0, md: 4 },
              color: 'secondary.main',
              fontStyle: 'italic'
            }} 
          >
            We're getting married!
          </Typography>
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
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 6,
            width: { xs: '100%', md: 'auto' }
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 8,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography sx={{ mb: 2 }}>
                  WHERE
                </Typography>
                <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                  Ufton Court
                </Typography>
                <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                  Green Lane
                </Typography>
                <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                  Berkshire
                </Typography>
                <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                  RG7 1JG
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography sx={{ mb: 2 }}>
                  WHEN
                </Typography>
                <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                  12:00
                </Typography>
                <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                  18 October 2025
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: { xs: 'none', md: 'block' }
            }}>
              <Typography sx={{ textAlign: 'center', mb: 2 }}>
                See you in
              </Typography>
              <Countdown />
            </Box>
          </Box>
        
          <Box sx={{ 
            flex: { xs: 'unset', md: 1 },
            position: 'relative',
            height: { xs: '300px', sm: '400px', md: '500px' },
            width: '100%',
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

        <Box sx={{ 
          display: { xs: 'block', md: 'none' },
          mt: 4
        }}>
          <Typography sx={{ textAlign: 'center', mb: 2, fontStyle: 'italic' }}>
            See you in
          </Typography>
          <Countdown />
        </Box>
      </Box>
    </PageFade>
  );
}
