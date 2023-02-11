// models/Movie.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const souvenirSchema = new Schema(
  {
    title: String,
    description: String,
    location:String,
    image: String
  },
  {
    timestamps: true
  }
);

module.exports = model("Souvenir", souvenirSchema);
