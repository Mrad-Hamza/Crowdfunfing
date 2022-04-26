const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskType = Object.freeze({
    InProgress: "in progress",
    Validated: "validated",
    Refused: "refused",
});
const Status = Object.freeze({
    ON: "ON",
    OFF: "OFF",
});
const taskSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true,
            minlength: [5, "Project name Minimum 10 charachters."],
        },
        taskDescription: {
            type: String,
            required: true,
            minlength: [5, "project Description Minimum 10 charachters."],
        },
        taskType: {
            type: String,
            required: true,
            enum: Object.values(TaskType),
        },
        taskAmount: {
            type: Number,
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
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

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
