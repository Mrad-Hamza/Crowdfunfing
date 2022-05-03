const router = require("express").Router();
let InvoiceProject = require("../models/invoiceProject.model");
const multer = require("multer");
let Project = require("../models/project.model");

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
    InvoiceProject.find()
        .then((projects) => res.json(projects))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getAll method
router.route("/").get((req, res) => {
    InvoiceProject.find()
        .then((invoices) => res.json(invoices))
        .catch((err) => res.status(400).json("Error: " + err));
});

//find by id method
router.route("/:id").get((req, res) => {
    InvoiceProject.findById(req.params.id)
        .then((invoices) => res.json(invoices))
        .catch((err) => res.status(400).json("Error: " + err));
});

//getByIdProject method
router.route("/all/:id").get((req, res) => {
    InvoiceProject.find({ project: req.params.id, status: "ON" })
        .then((invoices) => res.json(invoices))
        .catch((err) => res.status(400).json("Error: " + err));
});

//add method (fonctionnel)
router.route("/add").post(upload.single("invoiceFile"), (req, res) => {
    console.log(req.body);
    const status = "ON";
    const invoiceName = req.body.invoiceName;
    const invoiceFile = req.file.filename;
    const project = req.body.project;
    const user = req.body.user;

    const newInvoice = new InvoiceProject({
        invoiceName,
        invoiceFile,
        project,
        user,
        status,
    });
    console.log(newInvoice);
    console.log(req);
    newInvoice
        .save()
        .then(() => res.json("Invoice project added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});
//Archive method
router.route("/archive/:id").put((req, res) => {
    InvoiceProject.findById(req.params.id)
        .then((invoice) => {
            invoice.status = "OFF";
            invoice
                .save()
                .then(() => res.json("invoice archived!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//Activate method
router.route("/activate/:id").put((req, res) => {
    InvoiceProject.findById(req.params.id)
        .then((invoice) => {
            invoice.status = "ON";
            invoice
                .save()
                .then(() => res.json("invoice activated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});
//update method
router.route("/update/:id").put((req, res) => {
    InvoiceProject.findById(req.params.id)
        .then((invoice) => {
            invoice.invoiceFile = req.body.invoiceFile;
            invoice.invoiceDate = req.body.invoiceDate;
            invoice.project = req.body.project;
            invoice
                .save()
                .then(() => res.json("invoice project updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//delete method
router.route("/:id").delete((req, res) => {
    InvoiceProject.findByIdAndDelete(req.params.id)
        .then(() => res.json("invoice project deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
