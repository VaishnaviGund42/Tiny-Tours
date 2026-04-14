const Tour = require("../models/Tour");
const imagekit = require("../config/imagekit");

exports.createTour = async (req, res) => {
  const { title, price, description } = req.body;
  let imageUrl = req.body.image;

  if (req.file) {
    const fileBase64 = req.file.buffer.toString("base64");
    const uploadResponse = await imagekit.upload({
      file: fileBase64,
      fileName: req.file.originalname,
      folder: "/tiny-tours",
      useUniqueFileName: true,
    });
    imageUrl = uploadResponse.url;
  }

  const tour = await Tour.create({
    title,
    price,
    description,
    image: imageUrl,
    user: req.user.id,
  });
  res.send(tour);
};

exports.getTours = async (req, res) => {
  const tours = await Tour.find().populate("user", "name");
  res.send(tours);
};

exports.deleteTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return res.status(404).send("Tour not found");
  }
  if (tour.user.toString() !== req.user.id) {
    return res.status(403).send("You are not authorized to delete this tour");
  }
  await tour.deleteOne();
  res.send({ message: "Tour deleted successfully", id: req.params.id });
};