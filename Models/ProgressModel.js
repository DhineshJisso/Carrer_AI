const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    career: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      trim: true,
      default: "",
    },

    skill: {
      type: String,
      trim: true,
      default: "",
    },

    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    completedModules: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalModules: {
      type: Number,
      default: 0,
      min: 0,
    },

    skills: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    completedItems: [
      {
        type: String,
        trim: true,
      },
    ],

    learningHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Progress",
  progressSchema
);