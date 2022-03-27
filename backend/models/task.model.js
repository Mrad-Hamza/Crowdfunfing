const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskType = Object.freeze({
  InProgress: "in progress",
  Validated: "validated",
  Refused: "refused",
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
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
