const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    // ============================================
    // USER
    // ============================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // ============================================
    // EDUCATION
    // ============================================

    education: {
      degree: {
        type: String,
        required: true,
        trim: true,
      },

      field: {
        type: String,
        required: true,
        trim: true,
      },

      graduationYear: {
        type: Number,
        default: null,
      },
    },

    // ============================================
    // INTERESTS
    // ============================================

    interests: {
      type: [String],
      default: [],
    },

    // ============================================
    // CURRENT SKILLS
    // ============================================

    skills: {
      type: [String],
      default: [],
    },

    // ============================================
    // EXPERIENCE
    // ============================================

    experienceLevel: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
      default: "Beginner",
    },

    // ============================================
    // WORK STYLE
    // ============================================

    preferredWorkStyle: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // CAREER GOAL TEXT
    // ============================================

    careerGoals: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // SELECTED CAREER
    // ============================================

    career: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // ASSESSMENT STATUS
    // ============================================

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Assessment",
  assessmentSchema
);