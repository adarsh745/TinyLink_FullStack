const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // required for many hosted Postgres services like Neon
  },
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
  
module.exports = {
  query: (text, params) => pool.query(text, params),
};
