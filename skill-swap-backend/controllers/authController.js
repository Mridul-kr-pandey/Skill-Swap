const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Registration attempt for:', { username, email });

  try {
    // Validate input
    if (!username || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log('Existing user check:', existingUser ? 'Found' : 'Not found');
    
    if (existingUser) {
      console.log('Email already in use:', email);
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save user with error handling
    try {
      const savedUser = await newUser.save();
      console.log('User saved successfully:', { 
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email 
      });

      // Verify the user was saved by finding it
      const verifiedUser = await User.findOne({ email });
      console.log('Verification - User found in database:', verifiedUser ? 'Yes' : 'No');

      res.status(201).json({ 
        message: "User registered successfully",
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email
        }
      });
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      return res.status(500).json({ message: "Error saving user to database" });
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  console.log('Login attempt for email:', normalizedEmail);

  try {
    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
    console.log('User found:', user ? {
      id: user._id,
      username: user.username,
      email: user.email,
      hasPassword: !!user.password
    } : 'No user found');
    
    if (!user) {
      console.log('No user found with email:', normalizedEmail);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch ? 'Yes' : 'No');
      
      if (!isMatch) {
        console.log('Password does not match for user:', normalizedEmail);
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (compareError) {
      console.error('Error comparing passwords:', compareError);
      return res.status(500).json({ message: "Error verifying password" });
    }

    // Create token
    try {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      console.log('Login successful for user:', normalizedEmail);

      // Return token and user info
      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (tokenError) {
      console.error('Error creating token:', tokenError);
      return res.status(500).json({ message: "Error creating authentication token" });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
