// setup db connection
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql_oop',
    multipleStatements: true
})

module.exports = db