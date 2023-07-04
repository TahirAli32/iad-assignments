const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iad',
});

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to the database');
  }
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Render the registration form
app.get('/', (req, res) => {
  res.render('register');
});

// Handle registration form submission
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Save user data into the database
  connection.query('INSERT INTO users SET ?', {email, password}, (error, results) => {
    if (error) {
      console.error('Error saving user data:', error);
      res.send('Error saving user data');
    } else {
      console.log('User data saved successfully');
      res.send('User data saved successfully');
    }
  });
});

// Route to fetch all users
app.get('/users', (req, res) => {
  // Retrieve all users from the database
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    } else {
      console.log('Users fetched successfully');
      res.json(results);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
