const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceProjectSchema = new Schema(
  {
    invoiceFile: {
      type: String,
      required: true,
      minlength: [5, "Project invoice Minimum 10 charachters."],
    },
    invoiceDate: {
      type: Date,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const InvoiveProject = mongoose.model("InvoiveProject", invoiceProjectSchema);

module.exports = InvoiveProject;
