const router = require("express").Router();
let InvoiceProject = require("../models/invoiceProject.model");
let Project = require("../models/project.model");

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

//add method
router.route("/add").post((req, res) => {
  const invoiceFile = req.body.invoiceFile;
  const invoiceDate = req.body.invoiceDate;
  const project = req.body.project;

  const newInvoice = new InvoiceProject({
    invoiceFile,
    invoiceDate,
    project,
  });
  newInvoice
    .save()
    .then(() => res.json("Invoce project added!"))
    .catch((err) => res.status(400).json("Error: " + err));
  /*Project.findById(project)
    .then((projectt) => {
      projectt.tasks = newTask;
      projectt
        .save()
        .then(() => res.json("task added to project"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));*/
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
