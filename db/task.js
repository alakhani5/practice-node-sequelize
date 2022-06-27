// a model for tasks
const Sequelize = require('sequelize')
const db = require("./db");

const Task = db.define("task", {
  name: {
    type: Sequelize.STRING,
    allowNull: false, // more common so can be left out of the validate object
    validate: {
      // validate object needs to be added in
      notEmpty: true,
    },
    //prevent empty strings
  },
  complete: {
    type: Sequelize.BOOLEAN, //better practice to use a boolean than an ENUM here since it's true or false
    defaultValue: false,
  },
  due: {
    type: Sequelize.DATE,
  },
});

module.exports = Task;
