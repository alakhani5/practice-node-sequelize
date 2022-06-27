const express = require("express");
const app = express();
const apiRouter = require("./routes");
module.exports = app;
const { db } = require("./db");
// app.get('/users', (req,res) => {
//   res.json() // adds headers to the request saying we'll use JSON
// })

// need a body parser for json (express.json()) or xml/html form data (url encoded())
// done in app.js so it applies to all routes, no need to add it everywhere else
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use("/api", apiRouter);
// app.use is for all routes, get post put delete
// app.use is listening for all routes that start with /api

// app.use("/", (req, res) => {
//   res.redirect("/api");
// });

// initialization function to run the db connection

async function init() {
  try {
    db.sync();
  } catch (err) {
    console.error(err);
  }
}

init()

// sets up  the port for get requests
app.listen(3000, () =>
  console.log("Server has started listening on Port:3000")
);

/*
testing in insomnia
get http://localhost/3000/api

*/
