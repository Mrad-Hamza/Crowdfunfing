const router = require("express").Router();
let Complaint = require("../models/complaintProject.model");
// let Project = require("../models/project.model");
// let User = require("../models/user.model");
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
    Complaint.find()
        .then((complaints) => res.json(complaints))
        .catch((err) => res.status(400).json("Error: " + err));
});

//find by id method
router.route("/:id").get((req, res) => {
    Complaint.findById(req.params.id)
        .then((complaint) => res.json(complaint))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getByIdProject method
router.route("/all/:id").get((req, res) => {
    Complaint.find({ project: req.params.id })
        .then((complaints) => res.json(complaints))
        .catch((err) => res.status(400).json("Error: " + err));
});

//add method
router.route("/add").post(upload.single(""), (req, res) => {
    console.log(req.body);
    const status = "ON";
    const complaintProjectTitle = req.body.complaintProjectTitle;
    const complaintDescription = req.body.complaintDescription;
    const complaintType = "in progress";
    const project = req.body.project;
    const user = req.body.user;

    const newComplaint = new Complaint({
        complaintProjectTitle,
        complaintDescription,
        complaintType,
        project,
        user,
        status,
    });
    console.log(newComplaint);
    console.log(req);
    newComplaint
        .save()
        .then(() => res.json("Complaint project added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//update method
router.route("/update/:id").put((req, res) => {
    Complaint.findById(req.params.id)
        .then((complaint) => {
            complaint.complaintProjectTitle = req.body.complaintProjectTitle;
            complaint.complaintDescription = req.body.complaintDescription;
            complaint.complaintType = req.body.complaintType;
            complaint
                .save()
                .then(() => res.json("Complaint project updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//delete method
router.route("/:id").delete((req, res) => {
    Complaint.findByIdAndDelete(req.params.id)
        .then(() => res.json("Complaint project deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
