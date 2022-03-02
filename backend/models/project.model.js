const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
      minlength: [2, "projectType Minimum 2 charachters."],
    },
    projectCollectedAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
