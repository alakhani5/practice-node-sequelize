const { tasks } = require("googleapis/build/src/apis/tasks");
// const Sequelize = require('sequelize')
const { db, Task, Owner } = require("./db"); // require the index which then requires the associated files
// destructure the object to get all of the values being required

async function run() {
  try {
    console.log("connected to todos db");
    await db.sync({ force: true }); //sync opens the connection

    // add task and owner
    await Task.create({ name: "First Task" });
    await Task.create({ name: "second Task", ownerId: 1 });
    await Owner.create({ name: "Cherry" });

    // need a variable for the task and for the owner
    let cherry = await Owner.findAll( {
      where: {
        name: 'Cherry'
      }
    })

    let task = await Task.findByPk(1)

    // can either have the owner add a task or the task can add an owner
    // only need to do one:
    await cherry.addTask(task) // creates an association between cherry and the task
    // await task.addOwner(cherry)
    // console.log('this is cherry',cherry)
    // console.log('this is find by pk', task)
  } catch (err) {
    console.error(err);
  } finally {
    // finally will always execute, even after an error
    await db.close(); // close closes the connection to the db
    console.log('closed db')
  }
}

run()
//finally works and eventually closes the connection down, but does it programatically / more cleanly
