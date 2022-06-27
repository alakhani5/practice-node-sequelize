const express = require('express')
const app = express()
module.exports = app

app.get('/users', (req,res) => {
  res.json() // adds headers to the request saying we'll use JSON
})


if(!module.parent) app.listen(3000)
