Prerequisites: node.js, PostgreSQL
To start the project, do
```npm install```
in the project's root to install the main dependencies. Then, do
```npm start```
to start the app. It should launch on http://localhost:3000/

To connect it with your PostgreSQL database, edit these values in server.js. The ones here are just a sample.
```js
const pool = new Pool({
  host:     'localhost',
  port:     5432,
  database: 'eHotels',    ← your DB name
  user:     'postgres',    ← your DB user
  password: 'password',            ← your DB password
});
```
