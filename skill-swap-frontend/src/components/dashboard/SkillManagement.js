import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  Divider,
  MenuItem,
  Stack,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const SkillManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    availability: 'Flexible',
  });

  // Mock data - replace with actual data from your backend
  const [skills, setSkills] = useState([
    {
      id: 1,
      title: 'Web Development',
      description: 'Teaching modern web development with React and Node.js',
      category: 'Programming',
      level: 'Advanced',
      availability: 'Weekends',
    },
    {
      id: 2,
      title: 'Photography',
      description: 'Digital photography and photo editing',
      category: 'Arts',
      level: 'Intermediate',
      availability: 'Evenings',
    },
  ]);

  const handleOpenDialog = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm(skill);
    } else {
      setEditingSkill(null);
      setSkillForm({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        availability: 'Flexible',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSkill(null);
  };

  const handleInputChange = (e) => {
    setSkillForm({
      ...skillForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (editingSkill) {
      // Update existing skill
      setSkills(skills.map(skill =>
        skill.id === editingSkill.id ? { ...skillForm, id: skill.id } : skill
      ));
    } else {
      // Add new skill
      setSkills([...skills, { ...skillForm, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (skillId) => {
    setSkills(skills.filter(skill => skill.id !== skillId));
  };

  return (
    <Paper
      className="soft-shadow"
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
        border: '1px solid rgba(0,0,0,0.05)',
        background: 'white',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Skills
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 50, px: 3 }}
        >
          Add Skill
        </Button>
      </Box>

      <List>
        {skills.map((skill, index) => (
          <React.Fragment key={skill.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                px: 2,
                py: 2,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.04)' }
              }}
            >
              <Box sx={{ mr: 2, mt: 0.5, p: 1.5, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main' }}>
                <SchoolIcon />
              </Box>

              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                      {skill.title}
                    </Typography>
                    <Chip label={skill.level} size="small" color="primary" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, maxWidth: '90%' }}>
                      {skill.description}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={skill.category} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                      <Chip label={skill.availability} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                    </Stack>
                  </>
                }
              />

              <ListItemSecondaryAction sx={{ top: 24 }}>
                <IconButton onClick={() => handleOpenDialog(skill)} size="small" sx={{ mr: 1, color: 'text.secondary' }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDelete(skill.id)} size="small" color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < skills.length - 1 && <Divider component="li" variant="inset" />}
          </React.Fragment>
        ))}
        {skills.length === 0 && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              You haven't listed any skills yet.
            </Typography>
          </Box>
        )}
      </List>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 700 }}>
          {editingSkill ? 'Edit Skill' : 'Add New Skill'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Skill Title"
            name="title"
            value={skillForm.title}
            onChange={handleInputChange}
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={skillForm.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
            required
            variant="outlined"
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={skillForm.category}
                onChange={handleInputChange}
                margin="normal"
                required
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="Skill Level"
                name="level"
                value={skillForm.level}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              >
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <TextField
            fullWidth
            select
            label="Availability"
            name="availability"
            value={skillForm.availability}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          >
            {['Flexible', 'Weekends', 'Weekdays', 'Evenings'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!skillForm.title || !skillForm.description || !skillForm.category}
            sx={{ px: 3, borderRadius: 50 }}
          >
            {editingSkill ? 'Save Changes' : 'Create Skill'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SkillManagement;