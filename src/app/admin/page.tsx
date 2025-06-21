'use client';

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  CircularProgress,
  Alert,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import PageFade from '../components/PageFade';

interface Guest {
  id: string;
  name: string;
  rsvp: boolean | null;
  dietaryReqs: string | null;
  addressId: string | null;
  address: {
    id: string;
    address: string;
  } | null;
  menuChoices?: {
    id: string;
    appetiser: string | null;
    main: string | null;
    dessert: string | null;
  } | null;
}

interface Address {
  id: string;
  address: string;
}

const AdminPage = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState('all'); // all, attending, not-attending
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showBulkImportDialog, setShowBulkImportDialog] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [newGuest, setNewGuest] = useState({ name: '', address: '' });
  const [bulkImportData, setBulkImportData] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const ADMIN_PASSWORD = 'wedding2025'; // You should change this to a secure password

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchGuests();
      fetchAddresses();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchGuests = async () => {
    try {
      const response = await fetch('/api/admin/guests');
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      const data = await response.json();
      setGuests(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load guest data');
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/admin/addresses');
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const filteredGuests = guests.filter(guest => {
    if (filter === 'attending') return guest.rsvp === true;
    if (filter === 'not-attending') return guest.rsvp === false;
    return true; // 'all'
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Address', 'Attending', 'Starter', 'Main', 'Dessert', 'Dietary Requirements'];
    const csvData = filteredGuests.map(guest => [
      guest.name,
      guest.address?.address || '',
      guest.rsvp ? 'Yes' : 'No',
      guest.menuChoices?.appetiser || '',
      guest.menuChoices?.main || '',
      guest.menuChoices?.dessert || '',
      guest.dietaryReqs || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-rsvp-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAddGuest = async () => {
    try {
      const response = await fetch('/api/admin/guests/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuest)
      });

      if (!response.ok) {
        throw new Error('Failed to add guest');
      }

      await fetchGuests();
      setShowAddDialog(false);
      setNewGuest({ name: '', address: '' });
      setSnackbar({ open: true, message: 'Guest added successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to add guest', severity: 'error' });
    }
  };

  const handleEditGuest = async () => {
    if (!editingGuest) return;

    try {
      const response = await fetch(`/api/admin/guests/${editingGuest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingGuest.name,
          address: editingGuest.address?.address || ''
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update guest');
      }

      await fetchGuests();
      setShowEditDialog(false);
      setEditingGuest(null);
      setSnackbar({ open: true, message: 'Guest updated successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update guest', severity: 'error' });
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (!confirm('Are you sure you want to delete this guest?')) return;

    try {
      const response = await fetch(`/api/admin/guests/${guestId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete guest');
      }

      await fetchGuests();
      setSnackbar({ open: true, message: 'Guest deleted successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete guest', severity: 'error' });
    }
  };

  const handleBulkImport = async () => {
    try {
      // Parse CSV data
      const lines = bulkImportData.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const guestData = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const guest: any = {};
        headers.forEach((header, index) => {
          guest[header.toLowerCase()] = values[index] || '';
        });
        return guest;
      });

      const response = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests: guestData })
      });

      if (!response.ok) {
        throw new Error('Failed to import guests');
      }

      const result = await response.json();
      await fetchGuests();
      setShowBulkImportDialog(false);
      setBulkImportData('');
      setSnackbar({ 
        open: true, 
        message: `Bulk import completed: ${result.results.created} created, ${result.results.updated} updated`, 
        severity: 'success' 
      });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to import guests', severity: 'error' });
    }
  };

  const getAttendanceStats = () => {
    const total = guests.length;
    const attending = guests.filter(g => g.rsvp === true).length;
    const notAttending = guests.filter(g => g.rsvp === false).length;
    const pending = guests.filter(g => g.rsvp === null).length;
    return { total, attending, notAttending, pending };
  };

  const stats = getAttendanceStats();

  if (!isAuthenticated) {
    return (
      <PageFade>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 3
        }}>
          <Typography variant="h4" sx={{ color: 'secondary.main' }}>
            Admin Access
          </Typography>
          <Paper sx={{ p: 4, maxWidth: '400px', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                fullWidth
              />
              <Button 
                variant="contained" 
                onClick={handleLogin}
                sx={{ bgcolor: 'secondary.main' }}
              >
                Login
              </Button>
              {error && (
                <Alert severity="error">{error}</Alert>
              )}
            </Box>
          </Paper>
        </Box>
      </PageFade>
    );
  }

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
          <Typography>Loading guest data...</Typography>
        </Box>
      </PageFade>
    );
  }

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
              Error Loading Data
            </Typography>
            <Typography>{error}</Typography>
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
          Wedding RSVP Admin
        </Typography>

        {/* Stats */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 4, 
          mb: 4,
          flexWrap: 'wrap'
        }}>
          <Paper sx={{ p: 2, textAlign: 'center', minWidth: '120px' }}>
            <Typography variant="h6" color="primary">{stats.total}</Typography>
            <Typography variant="body2">Total Guests</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', minWidth: '120px' }}>
            <Typography variant="h6" color="success.main">{stats.attending}</Typography>
            <Typography variant="body2">Attending</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', minWidth: '120px' }}>
            <Typography variant="h6" color="error.main">{stats.notAttending}</Typography>
            <Typography variant="body2">Not Attending</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', minWidth: '120px' }}>
            <Typography variant="h6" color="warning.main">{stats.pending}</Typography>
            <Typography variant="body2">Pending</Typography>
          </Paper>
        </Box>

        {/* Controls */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Guests</MenuItem>
                <MenuItem value="attending">Attending</MenuItem>
                <MenuItem value="not-attending">Not Attending</MenuItem>
              </Select>
            </FormControl>

            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              onClick={() => setShowAddDialog(true)}
            >
              Add Guest
            </Button>

            <Button 
              variant="outlined" 
              startIcon={<UploadIcon />}
              onClick={() => setShowBulkImportDialog(true)}
            >
              Bulk Import
            </Button>
          </Box>

          <Button 
            variant="contained" 
            onClick={exportToCSV}
            sx={{ bgcolor: 'secondary.main' }}
          >
            Export to CSV
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Attending</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Starter</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Main</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Dessert</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Dietary Requirements</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.address?.address || '-'}</TableCell>
                  <TableCell>
                    {guest.rsvp === null ? (
                      <Typography color="warning.main">Pending</Typography>
                    ) : guest.rsvp ? (
                      <Typography color="success.main">Yes</Typography>
                    ) : (
                      <Typography color="error.main">No</Typography>
                    )}
                  </TableCell>
                  <TableCell>{guest.menuChoices?.appetiser || '-'}</TableCell>
                  <TableCell>{guest.menuChoices?.main || '-'}</TableCell>
                  <TableCell>{guest.menuChoices?.dessert || '-'}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    {guest.dietaryReqs || '-'}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Edit Guest">
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            setEditingGuest(guest);
                            setShowEditDialog(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Guest">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteGuest(guest.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Guest Dialog */}
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Full Name"
                value={newGuest.name}
                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Address (optional)"
                value={newGuest.address}
                onChange={(e) => setNewGuest({ ...newGuest, address: e.target.value })}
                fullWidth
                helperText="Leave empty if guest has no address"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleAddGuest} 
              variant="contained"
              disabled={!newGuest.name.trim()}
            >
              Add Guest
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Guest Dialog */}
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Guest</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Full Name"
                value={editingGuest?.name || ''}
                onChange={(e) => setEditingGuest(editingGuest ? { ...editingGuest, name: e.target.value } : null)}
                fullWidth
                required
              />
              <TextField
                label="Address"
                value={editingGuest?.address?.address || ''}
                onChange={(e) => setEditingGuest(editingGuest ? { 
                  ...editingGuest, 
                  address: editingGuest.address ? { 
                    ...editingGuest.address, 
                    address: e.target.value 
                  } : { 
                    id: '', 
                    address: e.target.value 
                  }
                } : null)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleEditGuest} 
              variant="contained"
              disabled={!editingGuest?.name?.trim()}
            >
              Update Guest
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bulk Import Dialog */}
        <Dialog open={showBulkImportDialog} onClose={() => setShowBulkImportDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Bulk Import Guests</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Paste CSV data with columns: name, address (optional)
              </Typography>
              <TextField
                label="CSV Data"
                value={bulkImportData}
                onChange={(e) => setBulkImportData(e.target.value)}
                multiline
                rows={10}
                fullWidth
                placeholder="name,address&#10;John Doe,123 Main St&#10;Jane Smith,456 Oak Ave"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowBulkImportDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleBulkImport} 
              variant="contained"
              disabled={!bulkImportData.trim()}
            >
              Import Guests
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </PageFade>
  );
};

export default AdminPage; 