const mysql = require('mysql2')

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db',
    multipleStatements: true
})
module.exports = connectionPool