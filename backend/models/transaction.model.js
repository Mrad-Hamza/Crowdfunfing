const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        user: {
            type: String,
        },
        campaign: {
            type: String,
        },
        amount: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", userSchema);

module.exports = Transaction;
