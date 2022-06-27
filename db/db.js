const Sequelize = require('sequelize')


const db = new Sequelize('postgres://localhost/todos', {logging: false}) // string is the connection string
// DON'T FORGET TO createdb [name]


module.exports = db
