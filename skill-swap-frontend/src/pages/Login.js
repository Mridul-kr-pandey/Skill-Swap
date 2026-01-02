import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else {
          throw new Error(responseData.message || 'Login failed. Please try again.');
        }
      }

      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)', // Adjust for navbar
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Grid container sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>

          {/* Left Side - Form */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ bgcolor: 'white', p: { xs: 4, md: 6 } }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Please enter your details to sign in.
            </Typography>

            {successMessage && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {successMessage}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ mb: 2 }}
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
                autoComplete="current-password"
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
                  boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)',
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Decorative */}
          <Grid
            size={{ md: 6 }}
            sx={{
              bgcolor: 'primary.main',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
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
            {/* Abstract shapes */}
            <Box sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.1)'
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.1)'
            }} />

            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, position: 'relative', zIndex: 1 }}>
              SkillSwap
            </Typography>
            <Typography variant="h6" align="center" sx={{ opacity: 0.9, position: 'relative', zIndex: 1 }}>
              "The best way to predict the future is to create it."
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;