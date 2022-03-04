import mysql from 'mysql';
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Database Connected !');
})

module.exports = connection;