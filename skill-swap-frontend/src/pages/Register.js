import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  Grid,
} from '@mui/material';
import { API_URL } from '../config';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }

      navigate('/login', {
        state: { message: 'Registration successful! Please login.' }
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Grid container sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>

          {/* Right Side - Decorative (Swapped for Register) */}
          <Grid
            size={{ md: 6 }}
            md={6}
            sx={{
              bgcolor: 'secondary.main',
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 6,
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{
              position: 'absolute',
              top: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.1)'
            }} />

            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, position: 'relative', zIndex: 1 }}>
              Join Us
            </Typography>
            <Typography variant="h6" align="center" sx={{ opacity: 0.9, position: 'relative', zIndex: 1 }}>
              Start your journey of sharing and learning today.
            </Typography>
          </Grid>

          {/* Left Side - Form */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ bgcolor: 'white', p: { xs: 4, md: 6 } }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Join our community of skill exchangers.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ minLength: 3 }}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="new-password"
                inputProps={{ minLength: 6 }}
                helperText="Must be at least 6 characters"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="new-password"
                inputProps={{ minLength: 6 }}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.4)',
                }}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'secondary.main',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;