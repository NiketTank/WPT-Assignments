const express = require("express");
const app = express();

const mysql = require('mysql2');
let dbparameters = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
    port: 3306
};
const conn = mysql.createConnection(dbparameters);


app.use(express.static('sf'));

app.get("/getAllitems", (req, resp) => {
    conn.query('select * from item', [],
        (err, rows) => {
            if (err) {
                console.log("error has occured let us see");
            } else {
                if (rows.length > 0)
                    console.log("sufr");
            }
            resp.send(rows);
        }
    );
});

app.get("/getitems", (req, resp) => {
    let input = req.query.itemno;
    let output = {
        itemnofoundstatus: false,
        itemdetails: { itemno: 3, itemname: "boxing", price: 50 },
    };
    conn.query('select * from item where itemno=?', [input],
        (err, rows) => {
            if (err) {
                console.log("error has occured let us see");
            } else {
                if (rows.length > 0) {
                    output.itemnofoundstatus = true;
                    output.itemdetails.itemname = rows[0].itemname;
                    output.itemdetails.price = rows[0].price;
                    console.log("maal aagya hai");
                }
                else {
                    console.log("item not found");
                }
            }
            resp.send(output);
        }
    );

});

app.get("/updateitems", (req, resp) => {
    let input = { itemno: req.query.x, itemname: req.query.y, price: req.query.z };
    let output = { status: false };
    conn.query('update item set price=? ,itemname=? where itemno=?', [input.price, input.itemname, input.itemno],
        (err, res1) => {
            if (err) {
                console.log("error has occured let us see");
            } else {
                output.status = true;
                console.log(output.status);
                console.log(res1.affectedRows);
            }
            resp.send(output);
        }

    );

});



app.get("/additems", (req, resp) => {
    let input = { itemno: req.query.x, itemname: req.query.y, price: req.query.z };
    let output = { status: false };
    conn.query('insert into item(itemno,itemname,price) values(?,?,?)', [input.itemno, input.itemname, input.price],
        (err, res1) => {
            if (err) {
                console.log("error has occured let us see");
            } else {
                if (res1.affectedRows > 0) {
                    output.status = true;
                    console.log(res1.affectedRows);
                }

            }
            resp.send(output);
        }
    );

});

app.listen(8081, function () {
    console.log("server ia listening to 8081....");
});