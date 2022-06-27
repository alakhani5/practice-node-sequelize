// model for the owner of a task

const Sequelize = require('sequelize')
const db = require("./db");

const Owner = db.define("owner", {
  name: {
    type: Sequelize.STRING,
    allowNull: false, // more common so can be left out of the validate object
    validate: {
      // validate object needs to be added in
      notEmpty: true, // prevents empty strings
    },
  },
});

module.exports = Owner;
