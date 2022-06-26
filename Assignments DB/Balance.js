const mysql = require('mysql2');
let dbparameters = {
    host: "localhost",
    user: "root",
    password: 'cdac',
    database: 'pleasework',
    port: 3306
};
const conn = mysql.createConnection(dbparameters);
console.log("database connction");

let accn = '3';
conn.query('select * from bank where acc_no=?', [accn],
    (err, rows) => {
        if (err) {
            console.log("Error has occured ");
        } else {
            if (rows.length > 0) {
                console.log(rows[0].balance + " ");
            }
        }
    }
);