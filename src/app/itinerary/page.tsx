'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, useTheme, Fade } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent, TimelineOppositeContent } from '@mui/lab';

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
    <Container maxWidth="md" sx={{ mt: 12, verticalAlign: 'middle' }}>
      <Timeline position="left">
        {timelineItems.map((item, index) => (
          <Fade in={visibleItems.includes(index)} timeout={800} key={index}>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant='h6'>
                {index % 2 === 1 ? item.time : item.content}
                </Typography>
                </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                {index < timelineItems.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
              <Typography variant='h6' sx={{ mb: 10 }}>
                {index % 2 === 0 ? item.time : item.content}
                </Typography>
                </TimelineContent>
            </TimelineItem>
          </Fade>
        ))}
      </Timeline>
    </Container>
  );
};

export default ItineraryPage;