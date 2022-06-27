const db = require("./db");
const Task = require("./task");
const Owner = require("./owner");

// form associations because this has access to all of the models

Task.belongsTo(Owner);
Owner.hasMany(Task);

module.exports = { db, Task, Owner };
