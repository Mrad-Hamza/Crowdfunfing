const router = require("express").Router();
let Complaint = require("../models/complaintTask.model");
let Task = require("../models/task.model");
let User = require("../models/user.model");
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

//add method
router.route("/add").post(upload.single(""), (req, res) => {
    console.log(req.body);
    const status = "ON";
    const complaintTaskTitle = req.body.complaintTaskTitle;
    const complaintDescription = req.body.complaintDescription;
    const complaintType = "in progress";
    const task = req.body.task;
    const user = req.body.user;

    const newComplaint = new Complaint({
        complaintTaskTitle,
        complaintDescription,
        complaintType,
        task,
        user,
        status,
    });
    console.log(newComplaint);
    console.log(req);
    newComplaint
        .save()
        .then(() => res.json("Complaint task added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

//Archive method
router.route("/archive/:id").put((req, res) => {
    Complaint.findById(req.params.id)
        .then((complaint) => {
            complaint.status = "OFF";
            complaint
                .save()
                .then(() => res.json("complaint archived!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//Activate method
router.route("/activate/:id").put((req, res) => {
    Complaint.findById(req.params.id)
        .then((complaint) => {
            complaint.status = "ON";
            complaint
                .save()
                .then(() => res.json("complaint activated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//update method
router.route("/update/:id").put((req, res) => {
    Complaint.findById(req.params.id)
        .then((complaint) => {
            complaint.complaintTaskTitle = req.body.complaintTaskTitle;
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
