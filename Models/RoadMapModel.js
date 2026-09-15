const mongoose = require("mongoose");


const careerRoadmapSchema =
  new mongoose.Schema(
    {

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },


      career: {
        type: String,
        required: true,
      },


      roadmap: [

        {
          step: {
            type: Number,
            required: true,
          },


          title: {
            type: String,
            required: true,
          },


          description: {
            type: String,
            default: "",
          },


          skills: {
            type: [String],
            default: [],
          },


          projects: {
            type: [String],
            default: [],
          },


          duration: {
            type: String,
            default: "",
          },


          status: {

            type: String,

            enum: [
              "Not Started",
              "In Progress",
              "Completed",
            ],

            default:
              "Not Started",

          },

        },

      ],

    },

    {
      timestamps: true,
    }
  );


// One active roadmap per user
careerRoadmapSchema.index(
  { userId: 1 },
  { unique: true }
);


module.exports =
  mongoose.model(
    "CareerRoadmap",
    careerRoadmapSchema
  );