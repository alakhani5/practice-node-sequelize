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

// error handling / 404
// passing anything to next will find the nearest error handler
// e.g., error handler in the router/tasks area, BUT needs to be copied and pasted everywhere
// need at least one of them to be a general error handler

// errors are just objects
// can access various keys and values of the objects e.g., error.status = value

// error handler only watches for errors specifically, NOT incorrect / invalid routes
app.use((err,req,res,next) => {
  console.log(err) // for us

  let statusCode = err.status || 500
  // the or (||)
  res.status(statusCode).send('An error occurred on the server: '+ err.message) // for users / the client
})


// someone trying to access a url path that did not have a corresponding route for it e.g., localhost/3000/blah isn't a valid route
// this is the last case
app.use((req,res,next) => {
  res.status(404).send(`CANNOT ${req.method} ${req.url}`)
})


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
