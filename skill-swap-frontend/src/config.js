// Centralized API configuration
// Logic: Use environment variable if available, otherwise default to local backend
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003/api';
