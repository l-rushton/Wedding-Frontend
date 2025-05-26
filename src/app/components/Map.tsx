import { Box, Link, Paper } from '@mui/material';

const Map = () => {
  const venue = "Ufton Court, Green Lane, Reading RG7 1JG";
  const encodedAddress = encodeURIComponent(venue);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDAL3kezfDC1Cjjv61x6Mt5J9AKinXTXeg&q=${encodedAddress}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Paper 
        elevation={3}
        sx={{ 
          position: 'relative',
          width: '100%',
          height: { xs: '300px', md: '400px' },
          overflow: 'hidden'
        }}
      >
        <Box
          component="iframe"
          src={mapUrl}
          sx={{
            border: 0,
            width: '100%',
            height: '100%'
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Paper>
      <Link 
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ 
          display: 'block',
          textAlign: 'center',
          mt: 2,
          color: 'secondary.main',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Get Directions →
      </Link>
    </Box>
  );
};

export default Map; 