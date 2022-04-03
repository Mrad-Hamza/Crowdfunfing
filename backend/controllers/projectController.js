let Project = require("../models/project.model");

//getAll method
const index = (req, res) => {
    Project.find()
        .then((projects) => res.json(projects))
        .catch((err) => res.status(400).json("Error: " + err));
};

//find by id method
const show = (req, res) => {
    Project.findById(req.params.id)
        .then((project) => res.json(project))
        .catch((err) => res.status(400).json("Error: " + err));
};

//add method
const add = (req, res) => {
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
    if (req.file) {
        newProject.image = req.file.path;
    }
    newProject
        .save()
        .then(() => res.json("Project added!"))
        .catch((err) => res.status(400).json("Error: " + err));
};

//update method
const update = (req, res) => {
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
};

// //delete method
// const delete = (req, res) => {
//     Project.findByIdAndDelete(req.params.id)
//         .then(() => res.json("Project deleted."))
//         .catch((err) => res.status(400).json("Error: " + err));
// };
