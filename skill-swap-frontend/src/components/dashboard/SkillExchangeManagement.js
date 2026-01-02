import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Collapse,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Stack,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Send as SendIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime,
  Person,
} from '@mui/icons-material';

const SkillExchangeManagement = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [requestForm, setRequestForm] = useState({
    skill: '',
    message: '',
  });

  // Mock data for skills offered
  const [skillsOffered, setSkillsOffered] = useState([
    {
      id: 1,
      title: 'Web Development',
      description: 'Teaching modern web development with React and Node.js',
      category: 'Programming',
      level: 'Advanced',
      availability: 'Weekends',
      requests: 2,
      status: 'Active',
      comments: [
        {
          id: 1,
          user: 'John Doe',
          text: 'Interested in learning React basics',
          time: '2 hours ago',
        },
      ],
    },
    {
      id: 2,
      title: 'Photography',
      description: 'Digital photography and photo editing',
      category: 'Arts',
      level: 'Intermediate',
      availability: 'Evenings',
      requests: 1,
      status: 'Active',
      comments: [
        {
          id: 1,
          user: 'Mike Johnson',
          text: 'Looking to learn portrait photography',
          time: '3 hours ago',
        },
      ],
    },
  ]);

  const [skillsRequested, setSkillsRequested] = useState([
    {
      id: 1,
      title: 'Graphic Design',
      teacher: 'John Doe',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Digital Marketing',
      teacher: 'Jane Smith',
      status: 'Accepted',
    },
  ]);

  const [activeExchanges, setActiveExchanges] = useState([
    {
      id: 1,
      skill: 'Web Development',
      student: 'Alice Johnson',
      progress: 'In Progress',
      nextSession: '2024-03-20',
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'request',
      message: 'New skill exchange request from Bob',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'message',
      message: 'New message from your student',
      time: '1 day ago',
      read: true,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
    setRequestForm({ skill: '', message: '' });
  };

  const handleRequestSubmit = () => {
    const newRequest = {
      id: skillsRequested.length + 1,
      title: requestForm.skill,
      teacher: 'To be assigned',
      status: 'Pending',
    };
    setSkillsRequested([...skillsRequested, newRequest]);
    handleCloseRequestDialog();
  };

  const handleInputChange = (e) => {
    setRequestForm({
      ...requestForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleExpandSkill = (skillId) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (skillId) => {
    const newComment = {
      id: Date.now(),
      user: 'You',
      text: commentText,
      time: 'Just now',
    };

    setSkillsOffered(skillsOffered.map(skill => {
      if (skill.id === skillId) {
        return {
          ...skill,
          comments: [...skill.comments, newComment],
        };
      }
      return skill;
    }));

    setCommentText('');
  };

  const handleMessageAll = (skillId) => {
    console.log('Message all for skill:', skillId);
    // Add messaging functionality here
  };

  const handleAcceptAll = (skillId) => {
    console.log('Accept all for skill:', skillId);
    // Add accept functionality here
  };

  const handleCancelRequest = (requestId) => {
    setSkillsRequested(skillsRequested.filter(request => request.id !== requestId));
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    }));
  };

  const handleEditSkill = (skillId) => {
    console.log('Edit skill:', skillId);
  };

  const handleDeleteSkill = (skillId) => {
    console.log('Delete skill:', skillId);
  };

  const renderSkillsOffered = () => (
    <List>
      {skillsOffered.map((skill) => (
        <React.Fragment key={skill.id}>
          <ListItem
            alignItems="flex-start"
            sx={{ px: 2, py: 2 }}
            secondaryAction={
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <IconButton onClick={() => handleEditSkill(skill.id)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDeleteSkill(skill.id)} size="small" color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleExpandSkill(skill.id)} size="small" color="primary">
                  {expandedSkill === skill.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Stack>
            }
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>{skill.title}</Typography>
                  {skill.requests > 0 && <Chip label={`${skill.requests} requests`} size="small" color="secondary" sx={{ height: 20, fontSize: '0.7rem' }} />}
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, maxWidth: '80%' }}>
                    {skill.description}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={skill.status} size="small" color={skill.status === 'Active' ? 'success' : 'default'} sx={{ height: 24 }} />
                    <Chip label={skill.level} size="small" variant="outlined" sx={{ height: 24 }} />
                  </Stack>
                </Box>
              }
            />
          </ListItem>

          <Collapse in={expandedSkill === skill.id} sx={{ width: '100%' }}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mx: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>Message Board</Typography>
              <List dense>
                {skill.comments.map((comment) => (
                  <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1.5, fontSize: '0.8rem' }}>{comment.user[0]}</Avatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" fontWeight={600}>{comment.user}</Typography>
                          <Typography variant="caption" color="text.secondary">{comment.time}</Typography>
                        </Box>
                      }
                      secondary={comment.text}
                    />
                  </ListItem>
                ))}
                {skill.comments.length === 0 && <Typography variant="caption" color="text.secondary">No messages yet.</Typography>}
              </List>

              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <TextField fullWidth size="small" placeholder="Reply..." value={commentText} onChange={handleCommentChange} sx={{ bgcolor: 'white' }} />
                <IconButton color="primary" onClick={() => handleCommentSubmit(skill.id)} disabled={!commentText.trim()}><SendIcon /></IconButton>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button size="small" startIcon={<MessageIcon />}>Message All</Button>
                <Button size="small" startIcon={<CheckIcon />} variant="contained" color="primary">Accept All</Button>
              </Stack>
            </Box>
          </Collapse>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );

  const renderSkillsRequested = () => (
    <List>
      {skillsRequested.map((skill) => (
        <React.Fragment key={skill.id}>
          <ListItem>
            <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}><Person /></Avatar>
            <ListItemText
              primary={<Typography variant="subtitle1" fontWeight={600}>{skill.title}</Typography>}
              secondary={`Teacher: ${skill.teacher}`}
            />
            <ListItemSecondaryAction>
              <Chip
                label={skill.status}
                color={skill.status === 'Accepted' ? 'success' : 'warning'}
                size="small"
                sx={{ mr: 1 }}
              />
              {skill.status === 'Pending' && (
                <IconButton edge="end" onClick={() => handleCancelRequest(skill.id)} size="small">
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenRequestDialog}
          fullWidth
          sx={{ borderStyle: 'dashed' }}
        >
          Request New Skill
        </Button>
      </Box>
    </List>
  );

  const renderActiveExchanges = () => (
    <List>
      {activeExchanges.map((exchange) => (
        <React.Fragment key={exchange.id}>
          <ListItem>
            <Box sx={{ mr: 2, p: 1, bgcolor: 'primary.light', color: 'white', borderRadius: '50%' }}><AccessTime fontSize="small" /></Box>
            <ListItemText
              primary={<Typography variant="subtitle1" fontWeight={600}>{exchange.skill}</Typography>}
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">{exchange.student}</Typography>
                  <Chip label={exchange.nextSession} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Chip label={exchange.progress} color="primary" size="small" sx={{ mr: 1 }} />
              <IconButton edge="end" size="small"><MessageIcon fontSize="small" /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const renderNotifications = () => (
    <List>
      {notifications.map((notification) => (
        <React.Fragment key={notification.id}>
          <ListItem
            sx={{
              bgcolor: notification.read ? 'transparent' : 'rgba(99, 102, 241, 0.05)',
              transition: '0.2s',
            }}
          >
            <Box sx={{ mr: 2, color: 'text.secondary' }}>
              {notification.type === 'request' ? <AddIcon /> : <MessageIcon />}
            </Box>
            <ListItemText
              primary={notification.message}
              secondary={notification.time}
              primaryTypographyProps={{ fontWeight: notification.read ? 400 : 600 }}
            />
            <ListItemSecondaryAction>
              {!notification.read && (
                <IconButton edge="end" onClick={() => handleMarkNotificationAsRead(notification.id)} color="primary" title="Mark as read">
                  <CheckIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Paper
      className="soft-shadow"
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: 4,
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, pt: 2 }}
        >
          <Tab label="Offered" />
          <Tab label="Requested" />
          <Tab label="Active" />
          <Tab
            label={
              <Badge badgeContent={notifications.filter(n => !n.read).length} color="error" sx={{ pr: 2 }}>
                Notifications
              </Badge>
            }
          />
        </Tabs>
      </Box>

      {currentTab === 0 && renderSkillsOffered()}
      {currentTab === 1 && renderSkillsRequested()}
      {currentTab === 2 && renderActiveExchanges()}
      {currentTab === 3 && renderNotifications()}

      <Dialog open={openRequestDialog} onClose={handleCloseRequestDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Request New Skill</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="What skill do you want to learn?"
            name="skill"
            value={requestForm.skill}
            onChange={handleInputChange}
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Message / Requirements"
            name="message"
            value={requestForm.message}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            required
            variant="outlined"
            placeholder="Describe what you are looking for..."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseRequestDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleRequestSubmit} variant="contained" sx={{ px: 4, borderRadius: 50 }}>
            Post Request
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SkillExchangeManagement;