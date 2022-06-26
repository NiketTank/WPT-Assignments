const express = require("express");
const app = express();

const mysql = require('mysql2');
let dbparameters = {
    host: "localhost",
    user: "root",
    password: 'cdac',
    database: 'pleasework',
    port: 3306
};
const conn = mysql.createConnection(dbparameters);
app.use(express.static('sf'));

app.get("/acc", (req, resp) => {
    let input = req.query.acc;
    console.log(input);
    let outputstatus = { status: false, accbalce: 0 };

    conn.query('select * from bank where acc_no=?', [input],
        (err, rows) => {
            if (err) {
                console.log("Error has occured");
            } else {
                if (rows.length > 0) {
                    console.log(rows[0].balance + " ");
                    outputstatus.status = true;
                    outputstatus.accbalce = rows[0].balance;
                }
            }
            resp.send(outputstatus);
        });

});
app.listen(1230, function () {
    console.log("server ia listening to 1230....");
});