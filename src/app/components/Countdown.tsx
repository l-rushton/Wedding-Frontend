import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-10-18T12:30:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: { xs: 2, md: 4 }, 
      justifyContent: 'center',
      pb: 10
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">{timeLeft.days}</Typography>
        <Typography variant="body1">DAYS</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">{timeLeft.hours}</Typography>
        <Typography variant="body1">HOURS</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">{timeLeft.minutes}</Typography>
        <Typography variant="body1">MINUTES</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">{timeLeft.seconds}</Typography>
        <Typography variant="body1">SECONDS</Typography>
      </Box>
    </Box>
  );
};

export default Countdown; 