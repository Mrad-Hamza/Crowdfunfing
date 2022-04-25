const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = Object.freeze({
    ON: "ON",
    OFF: "OFF",
});
const invoiceTaskSchema = new Schema(
    {
        invoiceName: {
            type: String,
        },
        invoiceFile: {
            type: String,
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
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

const InvoiceTasks = mongoose.model("InvoiceTasks", invoiceTaskSchema);

module.exports = InvoiceTasks;
