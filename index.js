const express = require('express');
const app = express();
const dbConnect = require('./dbConnect');
const insertUser = require('./insertUser');

dbConnect();

app.use(express.static('public'));
app.use(express.json()); // Add this line to parse JSON requests

app.post('/register', (req, res) => {
  const email = req.body.email;
  const contraseña = req.body.contraseña;

  insertUser(email, contraseña);

  res.send('Usuario registrado con éxito');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});