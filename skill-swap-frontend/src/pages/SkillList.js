import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  InputAdornment,
  Avatar,
  Paper,
  Stack,
  Rating,
} from '@mui/material';
import {
  Search,
  FilterList,
  LocationOn,
  TrendingUp,
  School,
  ArrowForward,
} from '@mui/icons-material';

const SkillList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data from your backend
  const skills = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn modern web development with React and Node.js from an experienced full-stack developer.',
      category: 'Programming',
      location: 'New York',
      provider: 'John Doe',
      providerAvatar: '/avatars/john.jpg',
      rating: 4.9,
      reviewCount: 124,
      students: 450,
      color: '#6366f1',
    },
    {
      id: 2,
      title: 'Photography Masterclass',
      description: 'Master the art of photography, lighting, and photo editing using professional tools.',
      category: 'Arts',
      location: 'Los Angeles',
      provider: 'Sarah Smith',
      providerAvatar: '/avatars/sarah.jpg',
      rating: 4.8,
      reviewCount: 89,
      students: 230,
      color: '#ec4899',
    },
    {
      id: 3,
      title: 'Italian Cooking',
      description: 'Learn authentic Italian cooking techniques and recipes from a culinary expert.',
      category: 'Culinary',
      location: 'Chicago',
      provider: 'Mike Johnson',
      providerAvatar: '/avatars/mike.jpg',
      rating: 4.7,
      reviewCount: 56,
      students: 120,
      color: '#f59e0b',
    },
    {
      id: 4,
      title: 'Digital Marketing 101',
      description: 'Understand SEO, social media marketing, and content strategy to grow your business.',
      category: 'Marketing',
      location: 'Online',
      provider: 'Emily Chen',
      providerAvatar: '/avatars/emily.jpg',
      rating: 4.9,
      reviewCount: 210,
      students: 800,
      color: '#8b5cf6',
    },
    {
      id: 5,
      title: 'Yoga & Meditation',
      description: 'Find inner peace and improve flexibility with guided yoga and meditation sessions.',
      category: 'Health',
      location: 'San Francisco',
      provider: 'David Wilson',
      providerAvatar: '/avatars/david.jpg',
      rating: 5.0,
      reviewCount: 42,
      students: 95,
      color: '#10b981',
    },
    {
      id: 6,
      title: 'Spanish Language',
      description: 'Learn to speak, read, and write Spanish fluently with personalized lessons.',
      category: 'Language',
      location: 'Online',
      provider: 'Maria Garcia',
      providerAvatar: '/avatars/maria.jpg',
      rating: 4.6,
      reviewCount: 78,
      students: 150,
      color: '#ef4444',
    },
  ];

  const handleSkillClick = (skillId) => {
    navigate(`/skills/${skillId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', pb: 8 }}>
      {/* Hero Search Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          color: 'white',
          position: 'relative',
          mb: 8,
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" textAlign="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  letterSpacing: '-0.025em',
                  mb: 2
                }}
              >
                Discover New Skills
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 6,
                  opacity: 0.9,
                  fontWeight: 400,
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Connect with experts and learners in your community.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 50,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  maxWidth: 700,
                  mx: 'auto',
                }}
              >
                <Box sx={{ position: 'relative', flexGrow: 1 }}>
                  <InputAdornment position="start" sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.7)' }}>
                    <Search />
                  </InputAdornment>
                  <TextField
                    fullWidth
                    placeholder="Search for skills, topics, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        color: 'white',
                        pl: 6,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 }
                      }
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 50,
                    px: 4,
                    py: 1.5,
                    bgcolor: 'white',
                    color: 'primary.main',
                    boxShadow: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    }
                  }}
                  startIcon={<FilterList />}
                >
                  Filters
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Skills Grid */}
      <Container maxWidth="lg" sx={{ mt: -8 }}>
        <Grid container spacing={4}>
          {skills.map((skill) => (
            <Grid key={skill.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    '& .skill-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleSkillClick(skill.id)}
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box
                      className="skill-icon"
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        bgcolor: `${skill.color}15`,
                        color: skill.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <School fontSize="large" />
                    </Box>
                    <Chip
                      label={skill.category}
                      size="small"
                      sx={{
                        bgcolor: `${skill.color}10`,
                        color: skill.color,
                        fontWeight: 600,
                        borderRadius: 2
                      }}
                    />
                  </Box>

                  <CardContent sx={{ px: 3, pt: 0, pb: 3, flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: 700, lineHeight: 1.3 }}
                    >
                      {skill.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 3 }}
                    >
                      {skill.description}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {skill.location}
                      </Typography>
                    </Stack>

                    <Box sx={{ pt: 2, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={skill.providerAvatar}
                          alt={skill.provider}
                          sx={{ width: 32, height: 32, mr: 1.5 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1 }}>
                            {skill.provider}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Rating value={skill.rating} max={1} readOnly size="small" sx={{ color: '#f59e0b', fontSize: '0.9rem' }} />
                            <Typography variant="caption" sx={{ ml: 0.5, color: '#f59e0b', fontWeight: 600 }}>
                              {skill.rating}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                              ({skill.reviewCount})
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption" fontWeight={500}>
                          {skill.students}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SkillList;