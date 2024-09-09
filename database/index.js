const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "bzhbvlu6wsgbwwxivoig-mysql.services.clever-cloud.com",
    user: "u5ybgsfhnqalimlp",
    password: "3Ra5zOPHgy1sMxp6rpSj",
    database: "bzhbvlu6wsgbwwxivoig",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) {
        console.log(err)
        return
    }
    console.log("Connected successfully")
})

module.exports = pool.promise()