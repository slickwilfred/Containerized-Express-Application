const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'mydb'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// Fetch items
app.get('/items', (req, res) => {
  connection.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Add a new item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (error, results) => {
    if (error) throw error;
    res.send({ id: results.insertId, name, description });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
