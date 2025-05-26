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
    const weddingDate = new Date('2025-10-18T12:00:00');

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

  const timeUnit = (value: number, label: string) => (
    <Box sx={{ textAlign: 'center', minWidth: { xs: '60px', md: '80px' } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'secondary.main',
          fontSize: { xs: '1.8rem', md: '2.5rem' }
        }}
      >
        {value.toString().padStart(2, '0')}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 1,
          fontSize: { xs: '0.8rem', md: '1rem' }
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: { xs: 2, md: 4 }, 
      justifyContent: 'center'
    }}>
      {timeUnit(timeLeft.days, 'DAYS')}
      {timeUnit(timeLeft.hours, 'HOURS')}
      {timeUnit(timeLeft.minutes, 'MINUTES')}
      {timeUnit(timeLeft.seconds, 'SECONDS')}
    </Box>
  );
};

export default Countdown; 