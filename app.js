const express = require('express');
const app = express();
const dbConnect = require('./dbConnect');
const insertUser = require('./insertUser');

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // TO DO: Implement login logic here
    // For now, just return a success message
    res.send('Login successful!');
  });