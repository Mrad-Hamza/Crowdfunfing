const router = require("express").Router();
let InvoiceTask = require("../models/invoiceTask.model");
let Task = require("../models/task.model");

//getAll method
router.route("/").get((req, res) => {
    InvoiceTask.find()
        .then((invoices) => res.json(invoices))
        .catch((err) => res.status(400).json("Error: " + err));
});

//find by id method
router.route("/:id").get((req, res) => {
    InvoiceTask.findById(req.params.id)
        .then((invoices) => res.json(invoices))
        .catch((err) => res.status(400).json("Error: " + err));
});

//add method
router.route("/add").post((req, res) => {
    const invoiceFile = req.body.invoiceFile;
    const invoiceDate = req.body.invoiceDate;
    const task = req.body.task;

    const newInvoice = new InvoiceTask({
        invoiceFile,
        invoiceDate,
        task,
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
    InvoiceTask.findById(req.params.id)
        .then((invoice) => {
            invoice.invoiceFile = req.body.invoiceFile;
            invoice.invoiceDate = req.body.invoiceDate;
            invoice.task = req.body.task;
            invoice
                .save()
                .then(() => res.json("invoice project updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

//delete method
router.route("/:id").delete((req, res) => {
    InvoiceTask.findByIdAndDelete(req.params.id)
        .then(() => res.json("invoice project deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
