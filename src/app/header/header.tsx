import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderButton from './headerButton';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Itinerary', path: '/itinerary' },
    { label: 'Registry', path: '/registry' },
    { label: 'Set List', path: '/setlist' },
    { label: 'Menu', path: '/menu' },
    { label: 'Travel advice', path: '/travel' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  return (
    <>
        {isMobile ? (      
            <Typography 
                variant="h3" 
                component="h3" 
                align="center" 
                sx={{ 
                    mb: 4,
                    pt: 4,
                    fontWeight: 'light',
                    color: 'black'
                }}
            >
                Izzy & Louis
            </Typography>
            ) : (      
            <Typography 
                variant="h2" 
                component="h2" 
                align="center" 
                sx={{ 
                    mb: 4,
                    pt: 4,
                    fontWeight: 'light',
                    color: 'black'
                }}
            >
                Izzy & Louis
            </Typography>)
    }

      
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'primary.main',
          color: 'black',
          borderTop: '1px solid black',
          borderBottom: '1px solid black'
        }}
      >
        <Toolbar sx={{ justifyContent: isMobile ? 'normal' : 'center' }}>
          {isMobile ? (
            <>
            <Typography
            variant='h5'>
                Menu
            </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ position: 'absolute', right: 16 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                  '& .MuiDrawer-paper': { 
                    width: 120,
                    backgroundColor: theme.palette.primary.main
                  }
                }}
              >
                <List
                sx={{
                    justifyContent: 'top'
                }}>
                  {menuItems.map((item) => (
                    <ListItem 
                      key={item.label} 
                      onClick={() => handleNavigation(item.path)}
                      sx={{ 
                        color: 'black',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                        borderBottom: '1px solid black'
                      }}
                    >
                      <ListItemText primary={item.label} sx={{ fontSize: 28 }} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <HeaderButton 
                  key={item.label}
                  label={item.label} 
                  onClick={() => router.push(item.path)} 
                />
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;