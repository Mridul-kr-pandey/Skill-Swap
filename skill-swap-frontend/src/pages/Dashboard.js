import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stack,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import {
  School,
  SwapHoriz,
  Notifications,
  Star,
  TrendingUp,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import SkillManagement from '../components/dashboard/SkillManagement';
import SkillExchangeManagement from '../components/dashboard/SkillExchangeManagement';

const Dashboard = () => {
  // Mock data - replace with actual data from your backend
  const stats = [
    { title: 'Skills Offered', value: 3, icon: <School />, color: '#6366f1', trend: '+1 this week' },
    { title: 'Skills Requested', value: 2, icon: <SwapHoriz />, color: '#ec4899', trend: '+2 new' },
    { title: 'Active Exchanges', value: 1, icon: <Star />, color: '#f59e0b', trend: 'On track' },
    { title: 'Notifications', value: 5, icon: <Notifications />, color: '#10b981', trend: '3 unread' },
  ];

  const recentActivities = [
    {
      type: 'request',
      message: 'John requested to learn Web Development from you',
      time: '2 hours ago',
      user: 'John Doe',
      avatar: 'J'
    },
    {
      type: 'accept',
      message: 'Sarah accepted your request to learn Photography',
      time: '1 day ago',
      user: 'Sarah Smith',
      avatar: 'S'
    },
    {
      type: 'complete',
      message: 'Completed skill exchange with Mike',
      time: '3 days ago',
      user: 'Mike Johnson',
      avatar: 'M'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', pb: 8 }}>
      <Box sx={{ bgcolor: 'primary.main', pt: 8, pb: 12, mb: -8, background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 800 }}>
            Welcome back, User!
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Here's what's happening with your skill exchanges today.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                className="soft-shadow"
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: `${stat.color}15`,
                        color: stat.color,
                        display: 'flex',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 600 }}>
                      {stat.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                      <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                      <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                        {stat.trend}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Main Content Area */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              <SkillManagement />
              <SkillExchangeManagement />
            </Stack>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* Recent Activities Section */}
            <Paper
              className="soft-shadow"
              sx={{
                p: 0,
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Activity
                </Typography>
                <Box sx={{ p: 0.5, bgcolor: '#f1f5f9', borderRadius: 1.5 }}>
                  <AccessTime fontSize="small" color="action" />
                </Box>
              </Box>

              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        p: 2.5,
                        '&:hover': { bgcolor: '#f8fafc' },
                        transition: '0.2s'
                      }}
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          mt: 0.5,
                          bgcolor: activity.type === 'request' ? 'primary.light' : activity.type === 'accept' ? 'success.light' : 'info.light',
                          width: 40,
                          height: 40,
                          fontSize: '1rem',
                          fontWeight: 600
                        }}
                      >
                        {activity.avatar}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.4, mb: 0.5 }}>
                            {activity.message}
                          </Typography>
                        }
                        secondary={
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600, cursor: 'pointer' }}>
                  View All Activity
                </Typography>
              </Box>
            </Paper>

            {/* Quick Actions or Promo */}
            <Paper
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Unlock Premium Features</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                  Get unlimited skill exchanges and verified badges.
                </Typography>
                <Box
                  component="button"
                  sx={{
                    border: 'none',
                    bgcolor: 'white',
                    color: '#db2777',
                    px: 3,
                    py: 1,
                    borderRadius: 50,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }
                  }}
                >
                  Upgrade Now
                </Box>
              </Box>
              {/* Decorative circle */}
              <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ position: 'absolute', bottom: -10, left: -10, width: 60, height: 60, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;