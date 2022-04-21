const router = require("express").Router();
let Task = require("../models/task.model");
let Project = require("../models/project.model");

//getAll method
router.route("/").get((req, res) => {
    Task.find()
        .then((tasks) => res.json(tasks))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getByIdProject method
router.route("/all/:id").get((req, res) => {
    //const project = Project.findById(req.params.id);
    Task.find({ project: req.params.id })
        .then((tasks) => res.json(tasks))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getByIdProjectActive method
router.route("/active/:id").get((req, res) => {
    const projectt = Project.findById(req.params.id);
    Task.find({ project: projectt.ObjectId }, { status: "ON" })
        .then((tasks) => res.json(tasks))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getByIdProjectArchived method
router.route("/deleted/:id").get((req, res) => {
    Task.find({ project: req.params.id }, { status: "OFF" })
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
    const status = "ON";

    const newTask = new Task({
        taskName,
        taskDescription,
        taskType,
        project,
        status,
    });
    newTask
        .save()
        .then(() => res.json("Task added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    Project.findById(project)
        .then((projectt) => {
            projectt.tasks.push(newTask);
            projectt
                .save()
                .then(() => res.json("task added to project"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
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
            task.save()
                .then(() => res.json("task updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//Archive method
router.route("/archive/:id").put((req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            task.status = "OFF";
            task.save()
                .then(() => res.json("project archived!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//Activate method
router.route("/activate/:id").put((req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            task.status = "ON";
            task.save()
                .then(() => res.json("project activated!"))
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
