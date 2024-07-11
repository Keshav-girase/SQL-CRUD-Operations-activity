const { faker, tr } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path =require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Keshav@007'
});

let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}

// web APis 

app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM user`;
    try {
        connection.query(q , (err, result) => {
            if (err) throw err; 
            let count = result[0]['count(*)'];
            console.log(result);
            res.render("home.ejs", {count})
        });
    } catch (err) {
        res.send(`Oops! Can't retrive data due some Error occured : ${err}`);
    }
});

app.get("/user" , (req, res) =>{
    let q = `SELECT * FROM user`;
    try {
        connection.query(q , (err, users) => {
            if (err) throw err; 
            res.render("showusers.ejs", {users});
        });
    } catch (err) {
        res.send(`Oops! Can't retrive data due some Error occured : ${err}`);
    }
})

// edit route 
app.get("/user/:id/edit", (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`
    try {
        connection.query(q , (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        });
    } catch (err) {
        res.send(`Oops! Can't retrive data due some Error occured : ${err}`);
    }
})

// update route

app.patch("/user/:id" , (req, res) => {
    let {id} = req.params;
    let {password: formPass, username: newUsername } = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`
    try {
        connection.query(q , (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (formPass != user.password) {
                res.send("wrong password please enter correct password")
            } else {
                let q2 = `UPDATE user SET userName = '${newUsername}' WHERE id = '${id}'`;
                connection.query(q2 , (err, result) => {
                    if (err) throw err;
                    res.redirect("/user");
                });
            }
        });
    } catch (err) {
        res.send(`Oops! Can't retrive data due some Error occured : ${err}`);
    }
});

app.listen("8080", () => {
    console.log("server is listing on port 8080");
});

