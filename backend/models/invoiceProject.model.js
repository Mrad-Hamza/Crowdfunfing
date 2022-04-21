const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceProjectSchema = new Schema(
    {
        invoiceName: {
            type: String,
        },
        invoiceFile: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
    },
    {
        timestamps: true,
    }
);

const InvoiceProjects = mongoose.model("InvoiceProjects", invoiceProjectSchema);

module.exports = InvoiceProjects;
