const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceTaskSchema = new Schema(
    {
        invoiceFile: {
            type: String,
        },
        invoiceDate: {
            type: Date,
            required: true,
        },
        Task: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
    },
    {
        timestamps: true,
    }
);

const InvoiceTasks = mongoose.model("InvoiceTasks", invoiceTaskSchema);

module.exports = InvoiceTasks;
