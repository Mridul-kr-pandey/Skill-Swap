import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Stack,
    Avatar,
    Card,
    CardContent,
} from '@mui/material';
import {
    School,
    Handshake,
    EmojiEvents,
    Diversity1,
} from '@mui/icons-material';

const About = () => {
    const values = [
        {
            icon: <School fontSize="large" />,
            title: 'Continuous Learning',
            description: 'We believe learning is a lifelong journey that should be accessible to everyone.',
            color: '#6366f1',
        },
        {
            icon: <Handshake fontSize="large" />,
            title: 'Community First',
            description: 'Building strong connections through mutual support and skill sharing.',
            color: '#ec4899',
        },
        {
            icon: <Diversity1 fontSize="large" />,
            title: 'Inclusivity',
            description: 'Creating a welcoming space for people of all backgrounds and skill levels.',
            color: '#8b5cf6',
        },
        {
            icon: <EmojiEvents fontSize="large" />,
            title: 'Excellence',
            description: 'Encouraging high-quality exchanges that lead to real growth and mastery.',
            color: '#f59e0b',
        },
    ];

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'white',
                    pt: { xs: 8, md: 16 },
                    pb: { xs: 8, md: 12 },
                    textAlign: 'center',
                    background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 800, mb: 3 }}
                    >
                        About <span className="gradient-text">SkillSwap</span>
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
                    >
                        We're on a mission to democratize learning by connecting people who want to teach with people who want to learn.
                    </Typography>
                </Container>
            </Box>

            {/* Our Story */}
            <Container maxWidth="lg" sx={{ my: 8 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="animate-float">
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    borderRadius: 4,
                                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                                    transform: 'rotate(-2deg)'
                                }}
                            >
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80"
                                    alt="Team collaboration"
                                    sx={{
                                        width: '100%',
                                        borderRadius: 3,
                                        transform: 'rotate(2deg)',
                                        display: 'block'
                                    }}
                                />
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                            Our Story
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Started in 2024, SkillSwap was born from a simple idea: everyone has something to teach, and everyone has something to learn. We realized that traditional education can be expensive and inaccessible, while peer-to-peer learning offers a more personal and practical approach.
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Today, our platform connects thousands of learners and experts across the globe. Whether you're a student looking to learn coding, a professional wanting to master a new language, or a hobbyist sharing your passion for cooking, SkillSwap is your community for growth.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* Values Section */}
            <Container maxWidth="lg" sx={{ my: 12 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                        Our Values
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        The principles that guide everything we do.
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {values.map((value, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card
                                className="soft-shadow"
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            p: 2,
                                            borderRadius: '50%',
                                            bgcolor: `${value.color}15`,
                                            color: value.color,
                                            mb: 2
                                        }}
                                    >
                                        {value.icon}
                                    </Box>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default About;
