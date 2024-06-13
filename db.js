const { Connection } = require('tedious');

const config = {
  server: 'leandro',
  authentication: {
    type: 'ntlm',
    options: {
      userName: '', // leave empty for Windows Authentication
      password: ''  // leave empty for Windows Authentication
    }
  },
  options: {
    encrypt: true,
    database: 'juegosConsola'
  }
};

const connection = new Connection(config);

connection.on('connect', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

connection.connect().catch((err) => {
  console.error('Error connecting to database:', err);
});