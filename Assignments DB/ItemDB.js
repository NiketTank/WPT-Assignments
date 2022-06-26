const url = ""
let dbparameters = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
    port: 3306
};
const mysql = require('mysql2');
const conn = mysql.createConnection(dbparameters);
console.log("db adventures");

let a = 7;
let b = 'teabeg2';
let c = 400

conn.query('insert into item(itemno,itemname,price) values(?,?,?)', [a, b, c],
    (err, res1) => {
        if (err) {
            console.log("error has occured let us see");
        } else {
            console.log(res1.affectedRows);
        }
    }
);