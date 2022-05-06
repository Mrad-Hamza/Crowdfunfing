const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        user: {
            type : String
        },
        campaign: {
            _id:String,
            nameCompaign:String,
            typeCompaign :String,
            objective:String,
            description:String,
            deadline:Date,
            verified:String,
            status:String,
            cumulateAmount: Number
        },
        anonym: {
            type: Boolean
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
