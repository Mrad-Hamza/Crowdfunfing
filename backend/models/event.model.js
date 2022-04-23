const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventType = Object.freeze({
    Virtual: "virtual",
    Real: "real",
});

const eventSchema = new Schema(
    {
        nameEvent: {
            type: String,
            required: true,
            minlength: [3, "Name must have minimum 3 charachters."],
        },
        startDateEvent: {
            type: Date,
            required: true,
        },
        endDateEvent: {
            type: Date,
            required: true,
        },
        descriptionEvent: {
            type: String,
            required: true,
            minlength: [6, "Description must have minimum 6 charachters."],
        },
        // nbrplace: {
        //   type: Number,
        //   required: true
        // },

        urlEvent: {
            type: String,
        },
        location: {
            type: String,
        },
        eventImage: {
            // type: String
            contentType: String,
            imgName: String,
        },
        eventType: {
            type: String,
            //required: true,
            // enum: Object.values(EventType),
        },
        comments: { type: [String], default: [] },
        commentEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: "commentEvent",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
