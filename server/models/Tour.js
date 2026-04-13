const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Tour", tourSchema);