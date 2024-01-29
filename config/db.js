const mysql = require("mysql2");


const db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '',
    database: 'nhame_cafe',
  });
  
  db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL database' );
    }
  });

module.exports = db;