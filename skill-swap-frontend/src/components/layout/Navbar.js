import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const isAuthenticated = false; // Replace with actual auth state

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar sx={{ height: 80 }}>
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          className="gradient-text"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          SkillSwap
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/skills"
            sx={{ fontWeight: 500 }}
          >
            Browse Skills
          </Button>
          {isAuthenticated ? (
            <>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              <IconButton
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 40, height: 40, border: '2px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                color="primary"
                component={RouterLink}
                to="/login"
                sx={{ fontWeight: 600 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/register"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.5)',
                  },
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/dashboard" onClick={handleMenuClose}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchorEl}
        open={Boolean(mobileMenuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={RouterLink} to="/skills" onClick={handleMenuClose}>
          Browse Skills
        </MenuItem>
        {isAuthenticated ? [
          <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose} key="profile">
            Profile
          </MenuItem>,
          <MenuItem component={RouterLink} to="/dashboard" onClick={handleMenuClose} key="dashboard">
            Dashboard
          </MenuItem>,
          <MenuItem onClick={handleLogout} key="logout">Logout</MenuItem>
        ] : [
          <MenuItem component={RouterLink} to="/login" onClick={handleMenuClose} key="login">
            Login
          </MenuItem>,
          <MenuItem component={RouterLink} to="/register" onClick={handleMenuClose} key="register">
            Register
          </MenuItem>
        ]}
      </Menu>
    </AppBar>
  );
};

export default Navbar;