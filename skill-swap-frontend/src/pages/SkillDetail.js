import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Schedule,
  CheckCircle,
  School,
  ArrowBack,
  Share,
  FavoriteBorder,
  VerifiedUser,
} from '@mui/icons-material';

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  // Mock data - replace with actual data from your backend
  const skill = {
    id: parseInt(id),
    title: 'Web Development Masterclass',
    description: 'Learn modern web development with React and Node.js. In this comprehensive course, we will cover everything from basic HTML/CSS to advanced state management and backend integration. Perfect for beginners and intermediates looking to upskill.',
    category: 'Programming',
    location: 'New York, NY',
    provider: {
      name: 'John Doe',
      avatar: '/avatar.jpg',
      rating: 4.9,
      reviewCount: 42,
      completedExchanges: 150,
      verified: true,
      bio: "Senior Full Stack Developer with 5+ years of teaching experience."
    },
    requirements: [
      'Basic understanding of programming concepts',
      'Laptop with internet connection',
      'Willingness to learn and practice',
      '4-5 hours per week commitment'
    ],
    schedule: 'Weekends (Sat/Sun), Flexible evenings',
    duration: '8 weeks',
    tags: ['React', 'Node.js', 'JavaScript', 'Web Dev'],
    color: '#6366f1',
  };

  const handleRequestExchange = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRequestMessage('');
  };

  const handleSubmitRequest = () => {
    console.log('Request submitted:', requestMessage);
    handleCloseDialog();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', pb: 8 }}>
      {/* Header / Cover */}
      <Box
        sx={{
          height: 300,
          background: `linear-gradient(135deg, ${skill.color} 0%, #a855f7 100%)`,
          position: 'relative',
          mb: 12
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
          <IconButton
            onClick={() => navigate('/skills')}
            sx={{ position: 'absolute', top: 24, left: 16, color: 'white', bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
          >
            <ArrowBack />
          </IconButton>

          {/* Overlapping Card */}
          <Paper
            className="soft-shadow"
            sx={{
              position: 'absolute',
              top: 150,
              left: 24,
              right: 24,
              borderRadius: 4,
              p: 4,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 3
            }}
          >
            <Box>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={skill.category} color="primary" size="small" sx={{ fontWeight: 600 }} />
                <Chip icon={<LocationOn fontSize="small" />} label={skill.location} variant="outlined" size="small" />
              </Stack>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                {skill.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {skill.tags.map(tag => (
                  <Chip key={tag} label={`#${tag}`} size="small" sx={{ bgcolor: 'rgba(0,0,0,0.05)' }} />
                ))}
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton sx={{ border: '1px solid #e2e8f0' }}>
                <Share fontSize="small" />
              </IconButton>
              <IconButton sx={{ border: '1px solid #e2e8f0', color: '#ec4899' }}>
                <FavoriteBorder fontSize="small" />
              </IconButton>
              <Button
                variant="contained"
                size="large"
                onClick={handleRequestExchange}
                sx={{ borderRadius: 50, px: 4, fontSize: '1.1rem', fontWeight: 600 }}
              >
                Request Exchange
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>About this Skill</Typography>
              <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                {skill.description}
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 6 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #f1f5f9', height: '100%' }} elevation={0}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle color="primary" /> Requirements
                  </Typography>
                  <List dense>
                    {skill.requirements.map((req, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText primary={req} primaryTypographyProps={{ color: 'text.secondary' }} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #f1f5f9', height: '100%' }} elevation={0}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule color="secondary" /> Logistics
                  </Typography>
                  <List dense>
                    {/* ... (rest of the list items) ... */}
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Schedule" secondary={skill.schedule} />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Duration" secondary={skill.duration} />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Format" secondary="Check description" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="soft-shadow" sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
              <Avatar
                src={skill.provider.avatar}
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2, border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                {skill.provider.name}
                {skill.provider.verified && <VerifiedUser color="primary" fontSize="small" />}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {skill.provider.bio}
              </Typography>

              <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{skill.provider.rating}</Typography>
                  <Rating value={skill.provider.rating} readOnly size="small" precision={0.1} />
                  <Typography variant="caption" display="block">Rating</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{skill.provider.completedExchanges}</Typography>
                  <School color="action" fontSize="small" />
                  <Typography variant="caption" display="block">Exchanges</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>42</Typography>
                  <Typography variant="caption" display="block">Reviews</Typography>
                </Box>
              </Stack>

              <Button fullWidth variant="outlined" sx={{ borderRadius: 50 }}>
                View Profile
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>


      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Request Exchange</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Send a message to <b>{skill.provider.name}</b>. Be specific about what you hope to learn and suggest a time to meet.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            placeholder="Hi, I'm interested in learning Web Development..."
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button
            onClick={handleSubmitRequest}
            variant="contained"
            disabled={!requestMessage.trim()}
            sx={{ borderRadius: 50, px: 4 }}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillDetail;