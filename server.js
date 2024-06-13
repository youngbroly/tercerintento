const http = require('http');
const fs = require('fs');
const path = require('path');
const insertUser = require('./insertUser'); // Importa functionem insertUser

let server = http.createServer((req, res) => {
  let url = req.url;
  let filePath = `.${url}`;

  if (url === '/') {
    filePath = './index.html';
  }

  let extname = path.extname(filePath);
  let contentType;

  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    default:
      contentType = 'application/octet-stream';
  }

  if (req.method === 'POST' && req.url === '/register') {
    // Handle user registration here
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const email = JSON.parse(body).email;
      const contraseña = JSON.parse(body).contraseña;

      // Insert user into database
      insertUser(email, contraseña); // Vocat functionem insertUser

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Usuario registrado con éxito');
    });
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Error: File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
});

server.listen(8000, () => {
  console.log('Server started on port 8000');
});