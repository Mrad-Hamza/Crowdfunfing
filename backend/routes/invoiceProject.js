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
    InvoiceProject.find({ project: req.params.id })
        .then((invoices) => res.json(invoices))
        .catch((err) => res.status(400).json("Error: " + err));
});

//add method (fonctionnel)
router.route("/add/:id").post(upload.single("invoiceFile"), (req, res) => {
    const invoiceName = req.body.invoiceName;
    const invoiceFile = req.file.filename;
    const project = req.params.id;

    const newInvoice = new InvoiceProject({
        invoiceName,
        invoiceFile,
        project,
    });
    if (req.file) {
        newInvoice.image = req.file.filename;
    }
    newInvoice
        .save()
        .then(() => res.json("Invoce project added!"))
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
