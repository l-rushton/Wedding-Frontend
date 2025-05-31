'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Typography, 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Alert,
  Paper,
  CircularProgress,
  Divider
} from '@mui/material';
import PageFade from '../components/PageFade';

interface GuestData {
  id: string;
  primaryGuestName: string;
  plusOneName?: string;
  email?: string;
}

const RSVPPage = () => {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get('id');
  
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    primaryAttendance: '',
    primaryDietaryRequirements: '',
    plusOneAttendance: '',
    plusOneDietaryRequirements: '',
    email: '',
    songSuggestion: '',
    additionalComments: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch guest data based on invite ID
  useEffect(() => {
    const fetchGuestData = async () => {
      if (!inviteId) {
        setError('Invalid invitation link. Please check your QR code.');
        setLoading(false);
        return;
      }

      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/guests/${inviteId}`);
        
        if (!response.ok) {
          throw new Error('Invitation not found');
        }
        
        const data: GuestData = await response.json();
        setGuestData(data);
        
        // Pre-fill email if available
        if (data.email) {
          setFormData(prev => ({
            ...prev,
            email: data.email || ''
          }));
        }
        
        setLoading(false);
      } catch (err) {
        setError('Unable to load invitation details. Please contact us directly.');
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [inviteId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteId,
          ...formData,
          guestData
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }
      
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <PageFade>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          py: 8
        }}>
          <CircularProgress sx={{ mb: 2, color: 'secondary.main' }} />
          <Typography>Loading your invitation...</Typography>
        </Box>
      </PageFade>
    );
  }

  // Error state
  if (error) {
    return (
      <PageFade>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          py: 8
        }}>
          <Alert severity="error" sx={{ mb: 4, maxWidth: '600px' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Oops! Something went wrong
            </Typography>
            <Typography>
              {error}
            </Typography>
          </Alert>
        </Box>
      </PageFade>
    );
  }

  // Success state
  if (submitted) {
    return (
      <PageFade>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          py: 8
        }}>
          <Alert severity="success" sx={{ mb: 4, maxWidth: '600px' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Thank you for your RSVP!
            </Typography>
            <Typography>
              We've received your response and can't wait to celebrate with you on our special day.
            </Typography>
          </Alert>
        </Box>
      </PageFade>
    );
  }

  return (
    <PageFade>
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" 
          sx={{ 
            mb: 2,
            pb: 1,
            color: 'secondary.main',
            fontStyle: 'italic'
          }}>
          RSVP
        </Typography>

        <Typography variant="body1" component="p" gutterBottom align="center" 
          sx={{ 
            mb: 4,
            color: 'secondary.main',
            maxWidth: '600px',
            mx: 'auto'
          }}>
          Please let us know if you'll be joining us for our special day by filling out the form below
        </Typography>

        <Paper elevation={1} sx={{ 
          maxWidth: '700px', 
          mx: 'auto', 
          p: 4,
          bgcolor: 'rgba(255, 255, 255, 0.8)'
        }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Primary Guest */}
              <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                {guestData?.primaryGuestName}
              </Typography>
              
              <FormControl component="fieldset" required>
                <FormLabel component="legend" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                  Will you be attending?
                </FormLabel>
                <RadioGroup
                  name="primaryAttendance"
                  value={formData.primaryAttendance}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes, I'll be there!" />
                  <FormControlLabel value="no" control={<Radio />} label="Sorry, I can't make it" />
                </RadioGroup>
              </FormControl>

              {formData.primaryAttendance === 'yes' && (
                <TextField
                  fullWidth
                  label="Dietary Requirements or Allergies"
                  name="primaryDietaryRequirements"
                  value={formData.primaryDietaryRequirements}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  helperText="Please let us know about any dietary restrictions, allergies, or special requirements"
                />
              )}

              {/* Plus One (if applicable) */}
              {guestData?.plusOneName && (
                <>
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                    {guestData.plusOneName}
                  </Typography>
                  
                  <FormControl component="fieldset" required>
                    <FormLabel component="legend" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                      Will they be attending?
                    </FormLabel>
                    <RadioGroup
                      name="plusOneAttendance"
                      value={formData.plusOneAttendance}
                      onChange={handleInputChange}
                      row
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes, they'll be there!" />
                      <FormControlLabel value="no" control={<Radio />} label="Sorry, they can't make it" />
                    </RadioGroup>
                  </FormControl>

                  {formData.plusOneAttendance === 'yes' && (
                    <TextField
                      fullWidth
                      label="Their Dietary Requirements or Allergies"
                      name="plusOneDietaryRequirements"
                      value={formData.plusOneDietaryRequirements}
                      onChange={handleInputChange}
                      multiline
                      rows={2}
                      variant="outlined"
                      helperText="Please let us know about any dietary restrictions, allergies, or special requirements"
                    />
                  )}
                </>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Contact Email */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                variant="outlined"
                helperText="We'll use this to send you any updates about the wedding"
              />

              {/* Song Suggestion */}
              <TextField
                fullWidth
                label="Song Suggestion for the Dance Floor"
                name="songSuggestion"
                value={formData.songSuggestion}
                onChange={handleInputChange}
                variant="outlined"
                helperText="Help us create the perfect playlist!"
              />

              {/* Additional Comments */}
              <TextField
                fullWidth
                label="Additional Comments or Messages"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                multiline
                rows={3}
                variant="outlined"
                helperText="Any special messages, questions, or requests?"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={submitting}
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'secondary.dark'
                  }
                }}
              >
                {submitting ? 'Submitting...' : 'Submit RSVP'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </PageFade>
  );
};

export default RSVPPage; 