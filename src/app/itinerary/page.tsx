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
    { time: "16:00", content: "Band" },
    { time: "17:15", content: "First Dance" },
    { time: "17:30", content: "Party time" },
    { time: "18:30", content: "Pizza truck arrival" },
    { time: "23:30", content: "Carriages" }
  ];

  useEffect(() => {
    // Check if animation has already played in this session
    const hasAnimated = sessionStorage.getItem('itinerary-animated');
    
    if (hasAnimated) {
      // If already animated, show all items immediately
      setVisibleItems(timelineItems.map((_, index) => index));
    } else {
      // If not animated yet, play the animation and mark as done
      const totalItems = timelineItems.length;
      const animationDelay = 400;

      for (let i = 0; i < totalItems; i++) {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * animationDelay);
      }
      
      // Mark that animation has played in this session
      sessionStorage.setItem('itinerary-animated', 'true');
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, px: { xs: 2, sm: 4, md: 8 }, position: 'relative' }}>

{/* <Typography variant="body1" component="h5" gutterBottom align="center" 
            sx={{
                fontFamily: 'var(--font-cinzel)',
                color: 'black',
                fontSize: '1.25rem'
            }}>
              Please arrive no later than 12:15 so we can start the ceremony on time!
        </Typography> */}
      <Timeline position="alternate" sx={{ 
        '& .MuiTimelineConnector-root': {
          bgcolor: 'black',
          width: '1px'
        }
      }}>
        {timelineItems.map((item, index) => (
          <Fade in={visibleItems.includes(index)} timeout={800} key={`timeline-item-${index}`}>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant='h6' sx={{ 
                  mt: '-4px',
                  fontSize: { 
                    xs: '1.25rem', 
                    md: '1.5rem'
                  },
                  color: 'secondary.main',
                  fontStyle: 'italic'
                }}>
                  {item.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot 
                  variant="outlined"
                  sx={{ 
                    borderColor: 'black',
                    width: '12px',
                    height: '12px',
                    borderWidth: '1px'
                  }} 
                />
                {index < timelineItems.length - 1 && (
                  <TimelineConnector sx={{ 
                    bgcolor: 'black',
                    width: '1px'
                  }} />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant='h6' sx={{ 
                  mt: '-8px', 
                  mb: item.content === "First Dance" ? 1 : 5,
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  color: 'secondary.main',
                  fontStyle: 'italic'
                }}>
                  {item.content}
                </Typography>
                {item.content === "First Dance" && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 5,
                      color: 'secondary.main',
                      fontSize: { xs: '0.875rem', md: '1.1rem' }
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