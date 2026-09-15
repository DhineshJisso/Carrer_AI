const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "Remote",
    },

    requiredSkills: {
      type: [String],
      default: [],
    },

    career: {
      type: String,
      required: true,
    },

    experienceLevel: {
      type: String,
      default: "Entry Level",
    },

    salaryRange: {
      type: String,
      default: "Not disclosed",
    },

    applyUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "jobs",
  }
);

module.exports = mongoose.model(
  "Job",
  jobSchema
);