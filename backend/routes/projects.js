const router = require("express").Router();
let Project = require("../models/project.model");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../src/assets/layout/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });
//getAll method
router.route("/").get((req, res) => {
    Project.find()
        .then((projects) => res.json(projects))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getArchivedList method
router.route("/deleted").get((req, res) => {
    Project.find({ status: "OFF" })
        .then((projects) => res.json(projects))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getActivatedList method
router.route("/active").get((req, res) => {
    Project.find({ status: "ON" })
        .then((projects) => res.json(projects))
        .catch((err) => res.status(400).json("Error: " + err));
});

//find by id method
router.route("/active/:id").get((req, res) => {
    Project.findById(req.params.id)
        .then((project) => res.json(project))
        .catch((err) => res.status(400).json("Error: " + err));
});

//add
router.route("/add").post(upload.single("image"), (req, res) => {
    console.log(req.body);
    const projectName = req.body.projectName;
    const projectDescription = req.body.projectDescription;
    const projectType = "in progress";
    const projectCollectedAmount = req.body.projectCollectedAmount;
    const status = "ON";
    const image = req.file.filename;
    const compaign = req.body.compaign;

    const newProject = new Project({
        projectName,
        projectDescription,
        projectType,
        projectCollectedAmount,
        image,
        status,
        compaign,
    });
    // if (req.file) {
    //     newProject.image = req.file.filename;
    // }
    console.log(newProject);
    console.log(req);
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

//Archive method
router.route("/archive/:id").put((req, res) => {
    Project.findById(req.params.id)
        .then((project) => {
            project.status = "OFF";
            project
                .save()
                .then(() => res.json("project archived!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//Activate method
router.route("/activate/:id").put((req, res) => {
    Project.findById(req.params.id)
        .then((project) => {
            project.status = "ON";
            project
                .save()
                .then(() => res.json("project activated!"))
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
