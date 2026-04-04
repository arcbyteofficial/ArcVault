const { Pool } = require('pg');
require('dotenv').config();

// Ensure connection passes even without SSL locally, but enforce SSL on Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const initializeDB = async () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  const vaultTable = `
    CREATE TABLE IF NOT EXISTS vault_items (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      login_url VARCHAR(255),
      username VARCHAR(255),
      encrypted_password TEXT NOT NULL,
      icon_color VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(usersTable);
    await pool.query(vaultTable);
    console.log('Database tables verified.');
  } catch (err) {
    console.error('Error initializing database tables:', err);
  }
};

module.exports = { pool, initializeDB };
