"use strict";

const express = require("express");
const router = express.Router();
const tasksRouter = require('./tasks')
const ownersRouter = require('./owners')

// middleware

// API routes
// routes for tasks and owners

// api / tasks
router.use('/tasks', tasksRouter)
// sends the request to / tasks and into the tasksRouter file

// api/owners
router.use('/owners', ownersRouter)

// no real view routes, so focus on api routes

// error handling / 404

module.exports = router;
