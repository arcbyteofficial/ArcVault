const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { pool } = require('../db');

// @route   GET /api/vault
// @desc    Get all user vault items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const items = await pool.query(
      'SELECT id, title, login_url, username, encrypted_password, icon_color, created_at FROM vault_items WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(items.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/vault
// @desc    Add new vault item
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, loginUrl, username, encryptedPassword, iconColor } = req.body;

  if (!title || !encryptedPassword) {
    return res.status(400).json({ error: 'Title and encrypted password are required' });
  }

  try {
    const newItem = await pool.query(
      'INSERT INTO vault_items (user_id, title, login_url, username, encrypted_password, icon_color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [req.user.id, title, loginUrl, username, encryptedPassword, iconColor || '#1C1C1E']
    );

    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/vault/:id
// @desc    Delete vault item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Verify item belongs to user
    const check = await pool.query('SELECT * FROM vault_items WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    await pool.query('DELETE FROM vault_items WHERE id = $1', [req.params.id]);
    res.json({ msg: 'Vault item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
