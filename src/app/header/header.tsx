import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderButton from './headerButton';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Itinerary', path: '/itinerary' },
    { label: 'Registry', path: '/registry' },
    { label: 'Menu', path: '/menu' },
    { label: 'Travel Advice', path: '/travel' }
  ];

  const getCurrentPageName = () => {
    if (pathname === '/') return 'Home';
    const currentItem = menuItems.find(item => item.path === pathname);
    return currentItem ? currentItem.label : '';
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  if (!mounted) {
    return (
      <Box 
        sx={{ 
          mb: 4,
          pt: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ 
          position: 'relative',
          width: { xs: '200px', sm: '250px', md: '300px' },
          height: { xs: '120px', sm: '150px', md: '180px' }
        }}>
          <Image 
            src="/images/landi.png" 
            alt="Izzy & Louis" 
            fill={true} 
            style={{ objectFit: 'contain' }} 
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
        <Box 
            sx={{ 
                mb: 4,
                pt: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box sx={{ 
              position: 'relative',
              width: { xs: '200px', sm: '250px', md: '300px' },
              height: { xs: '120px', sm: '150px', md: '180px' }
            }}>
              <Image 
                src="/images/landi.png" 
                alt="Izzy & Louis" 
                fill={true} 
                style={{ objectFit: 'contain' }} 
              />
            </Box>
        </Box>

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
                {getCurrentPageName()}
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
                  path={item.path}
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