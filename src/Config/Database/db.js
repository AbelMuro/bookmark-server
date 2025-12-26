const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
const {config} = require('dotenv');
config();

const pool = mysql.createPool({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,                   
    password: process.env.password,                        // Use the password that you entered when you installed mySQL
    database: process.env.database,                        // The name of the schema/database
    connectionLimit: 10,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, '../SSL/ca.pem'))
    }
});

module.exports = pool;