const Tour = require("../models/Tour");

exports.createTour = async (req, res) => {
  const tour = await Tour.create({
    ...req.body,
    user: req.user.id
  });
  res.send(tour);
};

exports.getTours = async (req, res) => {
  const tours = await Tour.find().populate("user", "name");
  res.send(tours);
};