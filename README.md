Prerequisites: node.js, PostgreSQL
To start the project, do:</br>
```npm install```</br>
in the project's root to install the main dependencies. Start your PostgreSQL server, then do:</br>
```npm start```</br>
to start the app. It should launch on http://localhost:3000/</br>

To connect it with your PostgreSQL database, edit these values in server.js. The ones here are just a sample.
```js
const pool = new Pool({
  host:     'localhost',
  port:     5432,
  database: 'eHotels',    Default DB name. Change it if needed.
  user:     'postgres',   Default DB user. Change it if needed.
  password: 'password',   Default DB password. Change it if needed.         
});
```
