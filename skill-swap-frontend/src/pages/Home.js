import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Rating,
  Stack,
  Chip,
} from '@mui/material';
import {
  School,
  SwapHoriz,
  People,
  Security,
  ArrowForward,
  Star,
  LocationOn,
  AccessTime,
  TrendingUp,
  EmojiEvents,
  CheckCircle,
} from '@mui/icons-material';

const features = [
  {
    icon: <School sx={{ fontSize: 40 }} />,
    title: 'Learn New Skills',
    description: 'Discover and learn new skills from experienced professionals in your community.',
    link: '/skills',
    color: '#6366f1',
    action: 'Browse Skills',
  },
  {
    icon: <SwapHoriz sx={{ fontSize: 40 }} />,
    title: 'Skill Exchange',
    description: 'Trade your expertise for new knowledge through our skill exchange platform.',
    link: '/register',
    color: '#ec4899',
    action: 'Get Started',
  },
  {
    icon: <People sx={{ fontSize: 40 }} />,
    title: 'Build Community',
    description: 'Connect with like-minded individuals and grow your professional network.',
    link: '/skills',
    color: '#8b5cf6',
    action: 'Join Now',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Safe & Secure',
    description: 'Our platform ensures safe and secure skill exchanges between verified users.',
    link: '/about',
    color: '#f59e0b',
    action: 'Learn More',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Web Developer',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
    text: 'SkillSwap helped me learn photography while teaching web development. The community is amazing!',
  },
  {
    name: 'Michael Chen',
    role: 'Graphic Designer',
    avatar: '/avatars/michael.jpg',
    rating: 5,
    text: 'I found my perfect skill exchange partner and learned digital marketing in just 3 months.',
  },
  {
    name: 'Emma Davis',
    role: 'Student',
    avatar: '/avatars/emma.jpg',
    rating: 5,
    text: 'The platform made it easy to find someone to teach me Spanish while I taught them coding.',
  },
];

const stats = [
  { number: '10k+', label: 'Active Users', icon: <People fontSize="large" /> },
  { number: '5k+', label: 'Skills Exchanged', icon: <SwapHoriz fontSize="large" /> },
  { number: '4.9', label: 'Average Rating', icon: <Star fontSize="large" /> },
  { number: '100+', label: 'Cities Covered', icon: <LocationOn fontSize="large" /> },
];

const benefits = [
  {
    icon: <TrendingUp fontSize="large" />,
    title: 'Grow Your Skills',
    description: 'Accelerate your learning curve with personalized mentorship.',
  },
  {
    icon: <People fontSize="large" />,
    title: 'Build Connections',
    description: 'Expand your professional network with meaningful interactions.',
  },
  {
    icon: <EmojiEvents fontSize="large" />,
    title: 'Earn Recognition',
    description: 'Build a reputation as an expert in your field.',
  },
  {
    icon: <AccessTime fontSize="large" />,
    title: 'Flexible Learning',
    description: 'Learn at your own pace, on your own schedule.',
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 12, md: 20 },
          pb: { xs: 12, md: 16 },
          background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="animate-fade-in">
                <Chip
                  label="🚀 The #1 Skill Exchange Platform"
                  sx={{
                    mb: 4,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    color: 'primary.main',
                    fontWeight: 600,
                    borderRadius: '8px'
                  }}
                />
                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '3rem', md: '4.5rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    mb: 3,
                  }}
                >
                  Exchange Skills, <br />
                  <span className="gradient-text">Grow Together</span>
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  paragraph
                  sx={{
                    mb: 6,
                    lineHeight: 1.6,
                    maxWidth: 480,
                  }}
                >
                  Join thousands of learners and experts. Teach what you know, learn what you love, and build a community of growth.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/skills"
                    variant="outlined"
                    size="large"
                    sx={{ borderWidth: 2 }}
                  >
                    Explore Skills
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                className="animate-float"
                sx={{
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    width: '60%',
                    height: '60%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    filter: 'blur(60px)',
                    opacity: 0.2,
                    zIndex: -1,
                    borderRadius: '50%',
                  }
                }}
              >
                <Box
                  component="img"
                  src="/LogoX.png" // Using the existing logo or potentially a generated image
                  alt="Skill Exchange Illustration"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    display: 'block',
                    margin: 'auto',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 16 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid key={index} size={{ xs: 6, md: 3 }}>
              <Paper
                className="soft-shadow"
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'white',
                  borderRadius: 4,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2, display: 'inline-flex', p: 1.5, borderRadius: '50%', bgcolor: 'rgba(99, 102, 241, 0.1)' }}>
                  {stat.icon}
                </Box>
                <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 800 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight={500}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>


      {/* Benefits Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: 16 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="overline" color="primary" fontWeight={700} sx={{ letterSpacing: 2 }}>
              BENEFITS
            </Typography>
            <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
              Why Choose <span className="gradient-text">SkillSwap</span>?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              We provide the tools and community you need to unlock your full potential.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 4,
                    '&:hover': {
                      bgcolor: 'white',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box sx={{ color: 'secondary.main', mb: 3 }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 16 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="overline" color="secondary" fontWeight={700} sx={{ letterSpacing: 2 }}>
            FEATURES
          </Typography>
          <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
            Everything you need to <span className="gradient-text">succeed</span>
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                className="soft-shadow"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  },
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={feature.link}
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 3 }}
                >
                  <Box
                    sx={{
                      color: feature.color,
                      mb: 3,
                      p: 2,
                      borderRadius: 3,
                      bgcolor: `${feature.color}15`,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ p: 0, mb: 'auto' }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ mt: 3, color: feature.color, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    {feature.action} <ArrowForward sx={{ ml: 1, fontSize: 18 }} />
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>


      {/* Testimonials Section */}
      <Box sx={{ py: 16 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 8 }}>
            Loved by <span className="gradient-text">Learners</span>
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Paper
                  className="soft-shadow"
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ width: 56, height: 56, mr: 2, border: '2px solid white', boxShadow: 1 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2, color: '#f59e0b' }} />
                  <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, px: 2 }}>
        <Container maxWidth="md">
          <Box
            className="gradient-bg soft-shadow"
            sx={{
              borderRadius: 6,
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Typography variant="h2" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
              Ready to Start?
            </Typography>
            <Typography variant="h6" sx={{ mb: 5, opacity: 0.9, position: 'relative', zIndex: 1 }}>
              Join the fastest growing skill exchange community today.
            </Typography>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
                px: 6,
                py: 2,
                borderRadius: 50,
                fontSize: '1.2rem',
                fontWeight: 700,
                position: 'relative',
                zIndex: 1
              }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;