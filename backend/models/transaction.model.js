const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        user: {
            type : String
        },
        campaign: {
            // const emptyCampaign = {
            //     _id: "6256c26547d815717428d8de",
            //     nameCompaign: "Test",
            //     typeCompaign: "",
            //     objective: "",
            //     description: "",
            //     deadline: new Date(),
            //     Verified: "",
            //     Status: "",
            // };
            _id:String,
            nameCompaign:String,
            typeCompaign :String,
            objective:String,
            description:String,
            deadline:Date,
            verified:String,
            status:String
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
