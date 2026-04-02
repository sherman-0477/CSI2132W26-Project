const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// PostgreSQL connection
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'eHotels',    // change to your DB name
  user: 'postgres',       // change to your DB user
  password: 'password',   // change to your DB password
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
    const result = await pool.query(
      `SELECT DISTINCT "hotelCity" FROM ${S}."Hotel" WHERE "hotelCity" IS NOT NULL ORDER BY "hotelCity"`
    );
    res.json(result.rows.map(r => r.hotelCity));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/chains/list', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT "chainID", "chainName" FROM ${S}."Chain" ORDER BY "chainName"`
    );
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/hotels/list', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT "hotelID", "hotelName", "hotelCity" FROM ${S}."Hotel" ORDER BY "hotelName"`
    );
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Searching rooms

// Booking rooms
app.post('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, c."custFullName",
             r."roomNumber", h."hotelName", h."hotelCity",
             r.price::numeric as price
      FROM ${S}."Booking" b
      JOIN ${S}."Customer" c ON c."customerID" = b."customerID"
      JOIN ${S}."Room" r ON r."roomID" = b."roomID"
      JOIN ${S}."Hotel" h ON h."hotelID" = r."hotelID"
      ORDER BY b."bookingDatetime" DESC
    `);
    res.json(result.rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Starting the app
app.listen(port, () => console.log(`Server running on port ${port}`));
