const sql = require('mssql');

const dbConnect = () => {
  const config = require('./config.json');
  const pool = new sql.ConnectionPool(config.dbConfig);

  pool.connect((err) => {
    if (err) {
      console.log("Error while connecting database: " + err);
    } else {
      console.log("connected to database: " + config.dbConfig.server);
    }
  });
};

module.exports = dbConnect;