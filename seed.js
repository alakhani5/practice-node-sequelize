const { tasks } = require("googleapis/build/src/apis/tasks");
// const Sequelize = require('sequelize')
const { db, Task, Owner } = require("./db"); // require the index which then requires the associated files
// destructure the object to get all of the values being required


// can add functions to the seed file for the sake of seeding the db that gets run during the run function

// e.g.,
async function addTasks() {
  let tasks = []
  for(let i = 0; i< 20; i++) {
    let newTask = {}
    newTask.name = `Task ${i}`
    newTask.complete = Math.random(1) > .5 ? true : false
    // newTask.due = new Date() + (Math.random() + 5000)
    newTask.ownerId = Math.floor(Math.random()*owners.length+1)
    await Task.create(newTask)
  }
}

let owners = [
  {name: 'chris'},
  {name: 'evan'},
  {name: 'chris'},
  {name: 'kandance'},
  {name: 'etc'},
  {name: 'etc2'},
]

async function addOwners() {
  owners.forEach((person) => await (Owner.create(person)))
}
// for loop that allows the db table to be seeded




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


    // referring to commented out random task and owner generators above
    await addOwners()
    await addTasks()

    // can either have the owner add a task or the task can add an owner
    // only need to do one:
    // await cherry.addTask(task) // creates an association between cherry and the task
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
