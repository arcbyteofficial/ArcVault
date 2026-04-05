const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { pool } = require('../db');
const authMiddleware = require('../middleware/auth');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'no-reply@vault.arcbyte.co',
    pass: process.env.SMTP_PASS || 'default_pass'
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'arcvault_super_secret_dev';

// Register
router.post('/register', async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;
  
  if (!email || !password || !fullName || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the master password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await pool.query(
      'INSERT INTO users (email, password, full_name, phone_number) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, phone_number',
      [email, hashedPassword, fullName, phoneNumber]
    );

    const user = newUser.rows[0];

    // Generate token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Google Login
router.post('/google-login', async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: 'Google Access Token is required' });
  }

  try {
    // 1. Fetch user data from Google with the access token
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!googleResponse.ok) {
      return res.status(401).json({ error: 'Failed to authenticate with Google' });
    }

    const googleUser = await googleResponse.json();
    
    // 2. We STRICTLY ONLY ALLOW login if the email exists in our db. No random registration.
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [googleUser.email]);
    const user = userResult.rows[0];

    if (!user) {
       // Stop the process: Bypassed registration block!
       return res.status(403).json({ error: 'No matching account found. Please register manually first to link your Google identity.' });
    }

    // 3. Email found! User exists. Grant access.
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, email: user.email } });

  } catch (err) {
    console.error('Google login error:', err.message);
    res.status(500).send('Server Error processing Google authentication');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Fetch Current User Identity (Profile Sync)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userResult = await pool.query('SELECT id, email, full_name, phone_number, created_at FROM users WHERE id = $1', [req.user.id]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User does not exist in database.' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error retrieving identity');
  }
});

module.exports = router;

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length === 0) {
      // Don't leak if email exists or not
      return res.json({ message: 'If that email is registered, a reset link has been sent.' });
    }

    const user = userCheck.rows[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token for database storage
    const resetHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Set expiration 1 hour from now
    const expires = new Date(Date.now() + 3600000);

    // Update Token in DB
    await pool.query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3',
      [resetHash, expires, user.id]
    );

    // Create the reset url utilizing the active node host mapping (Default hardcode to 5173 for Vite client in dev, or prod DOMAIN in prod)
    const clientHost = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientHost}/?resetToken=${resetToken}`;

    const mailOptions = {
      from: '"ArcVault Security" <no-reply@vault.arcbyte.co>',
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click on the following link or paste it into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'If that email is registered, a reset link has been sent.' });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'There was an error sending the email. Please try again later.' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  try {
    const resetHash = crypto.createHash('sha256').update(token).digest('hex');

    const result = await pool.query(
      'SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()',
      [resetHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
    }

    const user = result.rows[0];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query(
      'UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2',
      [hashedPassword, user.id]
    );

    res.json({ message: 'Your password has been successfully reset.' });

  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).send('Server Error');
  }
});
