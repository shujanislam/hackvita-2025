const { Pool } = require('pg');
const config = require('./pgsqlConfig');

const pool = new Pool(config);

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL database");
    client.release();
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
};

module.exports = connectDB;
