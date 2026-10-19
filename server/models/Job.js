const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Interviewing", "Offered", "Rejected"],
      default: "Applied",
    },
    appliedDate: { type: Date, default: Date.now },
    jobUrl: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", JobSchema);
