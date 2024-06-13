const sql = require('mssql');

const insertUser = async (email, password) => {
  const config = require('./config.json');
  const pool = new sql.ConnectionPool(config.dbConfig);

  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.query(`INSERT INTO usuarios (email, password) VALUES ('${email}', '${password}')`);
    return result;
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err;
  }
};

module.exports = insertUser;