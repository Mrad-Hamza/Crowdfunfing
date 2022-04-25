const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = Object.freeze({
    ON: "ON",
    OFF: "OFF",
});

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
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(Status),
        },
    },
    {
        timestamps: true,
    }
);

const InvoiceProjects = mongoose.model("InvoiceProjects", invoiceProjectSchema);

module.exports = InvoiceProjects;
