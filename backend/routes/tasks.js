const router = require("express").Router();
let Task = require("../models/task.model");

//getAll method
router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

//find by id method
router.route("/:id").get((req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add method
router.route("/add").post((req, res) => {
  const taskName = req.body.taskName;
  const taskDescription = req.body.taskDescription;
  const taskType = req.body.taskType;
  const project = req.body.project;

  const newTask = new Task({
    taskName,
    taskDescription,
    taskType,
    project,
  });

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update method
router.route("/update/:id").put((req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.taskName = req.body.taskName;
      task.taskDescription = req.body.taskDescription;
      task.taskType = req.body.taskType;
      task.project = req.body.project;
      task
        .save()
        .then(() => res.json("task updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete method
router.route("/:id").delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
