import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Rating,
  Chip,
} from '@mui/material';
import {
  Edit,
  School,
  SwapHoriz,
  Star,
  LocationOn,
  Email,
  Phone,
} from '@mui/icons-material';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Mock data - replace with actual data from your backend
  const user = {
    name: 'John Doe',
    avatar: '/avatar.jpg',
    location: 'New York',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    rating: 4.5,
    completedExchanges: 12,
    bio: 'Passionate about teaching and learning new skills. I specialize in web development and photography.',
  };

  const skillsOffered = [
    {
      id: 1,
      title: 'Web Development',
      category: 'Programming',
      rating: 4.8,
      students: 5,
    },
    {
      id: 2,
      title: 'Photography',
      category: 'Arts',
      rating: 4.5,
      students: 3,
    },
  ];

  const skillsLearning = [
    {
      id: 3,
      title: 'Cooking',
      category: 'Culinary',
      provider: 'Sarah Smith',
      progress: 'In Progress',
    },
    {
      id: 4,
      title: 'Guitar',
      category: 'Music',
      provider: 'Mike Johnson',
      progress: 'Completed',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid size="grow">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" sx={{ mr: 2 }}>
                    {user.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    size="small"
                  >
                    Edit Profile
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {user.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ color: 'warning.main', mr: 0.5 }} />
                    <Typography variant="body2">
                      {user.rating} ({user.completedExchanges} exchanges)
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" paragraph>
              {user.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<Email />}
                label={user.email}
                variant="outlined"
              />
              <Chip
                icon={<Phone />}
                label={user.phone}
                variant="outlined"
              />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
              <Tab
                icon={<School />}
                label="Skills Offered"
                iconPosition="start"
              />
              <Tab
                icon={<SwapHoriz />}
                label="Skills Learning"
                iconPosition="start"
              />
            </Tabs>

            {activeTab === 0 && (
              <List>
                {skillsOffered.map((skill) => (
                  <React.Fragment key={skill.id}>
                    <ListItem>
                      <ListItemIcon>
                        <School color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={skill.title}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip
                              label={skill.category}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Rating
                              value={skill.rating}
                              readOnly
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {skill.students} students
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}

            {activeTab === 1 && (
              <List>
                {skillsLearning.map((skill) => (
                  <React.Fragment key={skill.id}>
                    <ListItem>
                      <ListItemIcon>
                        <SwapHoriz color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={skill.title}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip
                              label={skill.category}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              Teacher: {skill.provider}
                            </Typography>
                            <Chip
                              label={skill.progress}
                              size="small"
                              color={skill.progress === 'Completed' ? 'success' : 'primary'}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
              startIcon={<School />}
            >
              Offer a New Skill
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SwapHoriz />}
            >
              Find Skills to Learn
            </Button>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Completed Exchanges"
                  secondary={user.completedExchanges}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Average Rating"
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={user.rating} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({user.rating})
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 