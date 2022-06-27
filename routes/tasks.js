const express = require("express");
const { tasks } = require("googleapis/build/src/apis/tasks");
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
    // req.body are ONLY accessible on post/put NOT get or delete

    let addedTask = await Task.create({name,complete})
    res.status(201).send(addedTask)

  } catch (err) {
    next(err) // make sure next is in the parameters
  }
})

// wasn't paying attention so this isn't correct
// router.get('/add/:ownerId/task/:taskId', async(req,res,next) => {
//   const {taskId,ownerId} = req.params
//   Task.getOwner(ownerId)
// })


router.delete('/:id', async (req,res,next) => {
  try {//delete or get would use a parameter, not a body item
  const {id} = req.params
  let taskToDelete = await Task.findByPk(id)
  if(!taskToDelete) {
    let error = new Error('No tasks with that id',id)
    error.status = 404
    throw error
  }
  await taskToDelete.destroy()

  // for Sequelize, there is a remove method
  // await Task.destroy(id) // don't forget to await db requests
  res.send(200)
  // also can be written as const id = req.params.id
  } catch (err) {
    next(err)
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
