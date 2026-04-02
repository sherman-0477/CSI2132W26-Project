const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 30000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// PostgreSQL connection
const pool = new Pool({
  user: 'your_db_user', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'your_db_name', // Should be eHotels, unless you decided to name it differently
  password: 'your_db_password', // Your DB password. I set it to 'password', but it might be different for you
  port: 5432,
});

// Views
app.get('/api/views/available-rooms', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${S}."AvailableRoomsPerCity" ORDER BY city`);
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/views/capacity-per-hotel', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${S}."CapacityPerHotel" ORDER BY "hotelName"`);
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Getting dropdown data
app.get('/api/cities', async (req, res) => {
  try {
    const result = await pool.query( `SELECT DISTINCT "hotelCity" FROM ${S}."Hotel" WHERE "hotelCity" IS NOT NULL ORDER BY "hotelCity"`);
    res.json(result.rows.map(row => row.hotelCity));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/hotels/list', async (req, res) => {
  try {
    const result = await pool.query(`SELECT "hotelID", "hotelName", "hotelCity" FROM ${S}."Hotel" ORDER BY "hotelName"`);
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/chains/list', async (req, res) => {
  try {
    const result = await pool.query(`SELECT "chainID", "chainName" FROM ${S}."HotelChain" ORDER BY "chainName"`);
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});


// Starting the app
app.listen(port, () => console.log(`Server running on port ${port}`));
