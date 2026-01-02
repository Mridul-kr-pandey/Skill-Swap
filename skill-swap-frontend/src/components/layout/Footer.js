import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#1e293b',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              className="gradient-text"
              sx={{ fontWeight: 700 }}
            >
              SkillSwap
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 300 }}>
              Connect with a vibrant community of learners and experts. Exchange skills, grow your knowledge, and build lasting professional relationships.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/skills" color="#cbd5e1" underline="hover">
                Browse Skills
              </Link>
              <Link component={RouterLink} to="/about" color="#cbd5e1" underline="hover">
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="#cbd5e1" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Connect With Us
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: '#cbd5e1', '&:hover': { color: '#6366f1' } }} aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: '#cbd5e1', '&:hover': { color: '#6366f1' } }} aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: '#cbd5e1', '&:hover': { color: '#ec4899' } }} aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: '#cbd5e1', '&:hover': { color: '#0ea5e9' } }} aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={6}
          pt={3}
          borderTop="1px solid rgba(255,255,255,0.1)"
          sx={{ textAlign: 'center' }}
        >
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            {'© '}
            {new Date().getFullYear()}
            {' SkillSwap. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;