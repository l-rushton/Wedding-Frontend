'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, useTheme, Link, Fade } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import SongSuggestionOverlay from '../components/SongSuggestionOverlay';

const ItineraryPage = () => {
  const theme = useTheme();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const timelineItems = [
    { time: "12:00", content: "Arrival" },
    { time: "12:30", content: "Ceremony" },
    { time: "13:15", content: "Reception" },
    { time: "14:00", content: "Wedding Breakfast" },
    { time: "15:00", content: "Speeches" },
    { time: "15:30", content: "Cutting the Cake" },
    { time: "16:00", content: "Band?" },
    { time: "17:15", content: "First Dance" },
    { time: "17:30", content: "Party time" },
    { time: "18:30", content: "Pizza truck arrival" },
    { time: "23:30", content: "Carriages" }
  ];

  useEffect(() => {
    const totalItems = timelineItems.length;
    const animationDelay = 400;

    for (let i = 0; i < totalItems; i++) {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * animationDelay);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, px: { xs: 2, sm: 4, md: 8 }, position: 'relative' }}>
        <Typography variant='h4' sx={{ mb: 4, textAlign: 'center' }}>
            Timeline
        </Typography>
      <Timeline position="right">
        {timelineItems.map((item, index) => (
          <Fade in={visibleItems.includes(index)} timeout={800} key={`timeline-item-${index}`}>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant='h6' sx={{ mt: '-4px' }}>
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                {index < timelineItems.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant='h6' sx={{ mt: '-4px', mb: item.content === "First Dance" ? 1 : 5 }}>
                  {item.content}
                </Typography>
                {item.content === "First Dance" && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 5,
                      color: 'secondary.main',
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    Got a song suggestion?{' '}
                    <Link
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'secondary.main',
                        textDecoration: 'underline',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Click here
                    </Link>
                    {' '}to submit!
                  </Typography>
                )}
              </TimelineContent>
            </TimelineItem>
          </Fade>
        ))}
      </Timeline>
    </Container>
  );
};

export default ItineraryPage; 