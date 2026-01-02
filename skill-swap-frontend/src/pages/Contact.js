import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { Engineering } from '@mui/icons-material';

const Contact = () => {
    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                py: 8
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    className="soft-shadow"
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        borderRadius: 4,
                        background: 'white',
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: 'rgba(99, 102, 241, 0.1)',
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3
                        }}
                    >
                        <Engineering sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }} className="gradient-text">
                        Coming Soon!
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        We're working hard to build a great support experience for you. The contact page will be available shortly.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        In the meantime, feel free to email us at <b style={{ color: '#6366f1' }}>support@skillswap.com</b>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Contact;
