// models/Movie.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const imageSchema = new Schema(
  {
    title: String,
    description: String,
    location:String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = model("Image", imageSchema);
