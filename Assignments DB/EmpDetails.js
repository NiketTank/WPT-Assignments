const express = require('express');
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

app.use(express.static("sf"))


app.get("/getEmployeeInfo", (req, res) => {
    let input = req.query.empno;

    let output = { status: false, empdetail: { empno: 0, empname: "", mobileno: 0 } };
    console.log("input got is " + input);
    conn.query('select * from employee where empnum=?', [input],
        (err, rows) => {
            if (err) {
                console.log("Error has occured ");
            } else {
                if (rows.length > 0) {
                    output.status = true;
                    output.empdetail.empname = rows[0].empname;
                    output.empdetail.mobileno = rows[0].mobileno;


                    console.log(rows[0].empname + " " + rows[0].mobileno);
                }
            }
            res.send(output);
        });
});
app.listen(1380, function () {
    console.log("server listening at port 1380...");
});