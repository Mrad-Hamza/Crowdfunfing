const router = require("express").Router();
let Project = require("../models/project.model");

//getAll method
router.route("/").get((req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
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

module.exports = router;
