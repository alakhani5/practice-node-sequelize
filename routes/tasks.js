const express = require("express");
const router = express.Router();
const {Task} = require('../db')

// this is now /api/tasks because the main basis is /api

router.get('/', async (req,res) => {
  res.send(await Task.findAll())
})
// basic router with one standard route

router.post('/', async (req,res, next) => {
  try {
    //need some data from our client (postman/client/insomnia)
    const {name, complete} = req.body

    let addedTask = await Task.create({name,complete})
    res.status(201).send(addedTask)

  } catch (err) {
    next(err) // make sure next is in the parameters
  }
})

/*
practice post
raw JSON as the body
{
	"name": "new special task"
}

{
	"name": "new special task",
	"complete": true
}

*/
module.exports = router // only export of the file
