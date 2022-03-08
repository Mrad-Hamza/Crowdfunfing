const router = require("express").Router();
let Project = require("../models/project.model");

//getAll method
router.route("/").get((req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error: " + err));
});

//find by id method
router.route("/:id").get((req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add method
router.route("/add").post((req, res) => {
  const projectName = req.body.projectName;
  const projectDescription = req.body.projectDescription;
  const projectType = req.body.projectType;
  const projectCollectedAmount = req.body.projectCollectedAmount;

  const newProject = new Project({
    projectName,
    projectDescription,
    projectType,
    projectCollectedAmount,
  });

  newProject
    .save()
    .then(() => res.json("Project added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update method
router.route("/update/:id").put((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      project.projectName = req.body.projectName;
      project.projectDescription = req.body.projectDescription;
      project.projectType = req.body.projectType;
      project.projectCollectedAmount = req.body.projectCollectedAmount;
      project
        .save()
        .then(() => res.json("project updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete method
router.route("/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
