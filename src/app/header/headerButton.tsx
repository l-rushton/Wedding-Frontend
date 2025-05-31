// CustomButton.tsx
import React from 'react';
import { usePathname } from 'next/navigation';
import { Box, Typography, useTheme } from '@mui/material';

interface HeaderButtonProps {
  label: string;
  path: string;
  onClick: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ label, path, onClick }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const isActive = pathname === path;

  return (
    <Box
      component="span"
      onClick={onClick}
      sx={{
        color: 'black',
        cursor: 'pointer',
        padding: '8px 12px',
        borderBottom: isActive ? `2px solid ${theme.palette.secondary.main}` : '2px solid transparent',
        transition: 'all 0.2s ease',
        opacity: isActive ? 1 : 0.8,
        '&:hover': {
          opacity: 1,
          borderBottom: '2px solid theme.palette.secondary.main)',
        }
      }}
    >
        <Typography
        variant='h5'
        >
            {label}
        </Typography>
    </Box>
  );
};

export default HeaderButton;
