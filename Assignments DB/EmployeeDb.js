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

let empnum = 1;
conn.query('select * from employee where empnum=?', [empnum],
    (err, rows) => {
        if (err) {
            console.log("error has occured let us see");
        } else {
            if (rows.length > 0) {
                console.log(rows[0].empname + " " + rows[0].mobileno);
            }
        }
    }
);