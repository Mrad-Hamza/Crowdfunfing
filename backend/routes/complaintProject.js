const router = require("express").Router();
let Complaint = require("../models/complaintProject.model");
let Project = require("../models/project.model");
let User = require("../models/user.model");

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
router.route("/add/:id").post((req, res) => {
    const complaintProjectTitle = req.body.complaintProjectTitle;
    const complaintDescription = req.body.complaintDescription;
    const complaintType = "in progress";
    const project = req.params.id;
    // const userId = req.body.user;
    // const user = User.findById(userId);
    // const project = Project.findById(projectId);

    const newComplaint = new Complaint({
        complaintProjectTitle,
        complaintDescription,
        complaintType,
        project,
        // user,
    });
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
