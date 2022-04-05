const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceProjectSchema = new Schema(
    {
        invoiceFile: {
            type: String,
        },
        invoiceDate: {
            type: Date,
            required: true,
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
