var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 400,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: "172.104.189.102",
    user: "remote_user",
    password: "myPassw0rd_01",
    database: "twitter"
})
pool.getConnection((err, connection) => {
    console.log("performing query")
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
module.exports = pool