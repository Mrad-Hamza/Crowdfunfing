const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectType = Object.freeze({
    InProgress: "in progress",
    Done: "done",
});

const projectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
            minlength: [10, "Project name Minimum 10 charachters."],
        },
        projectDescription: {
            type: String,
            required: true,
            minlength: [10, "project Description Minimum 10 charachters."],
        },
        projectType: {
            type: String,
            required: true,
            enum: Object.values(ProjectType),
        },
        projectCollectedAmount: {
            type: Number,
            required: true,
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
