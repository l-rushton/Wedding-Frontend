import React from 'react';
import { Fade, Container } from '@mui/material';

interface PageFadeProps {
    children: React.ReactNode;
}

const PageFade: React.FC<PageFadeProps> = ({ children }) => {
    return (
        <Fade in timeout={1000}>
            <Container 
                maxWidth="xl" 
                sx={{ 
                    px: { xs: 1, sm: 1.5, md: 16 }
                }}
            >
                {children}
            </Container>
        </Fade>
    );
};

export default PageFade; 