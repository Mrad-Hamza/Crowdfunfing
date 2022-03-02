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
      minlength: [500, "project Description Minimum 500 charachters."],
    },
    projectType: {
      type: String,
      required: true,
      minlength: [20, "Last Name Minimum 20 charachters."],
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
