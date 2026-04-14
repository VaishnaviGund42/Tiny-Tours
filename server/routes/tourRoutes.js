const express = require("express");
const multer = require("multer");
const router = express.Router();
const { createTour, getTours, deleteTour } = require("../controllers/tourController");
const auth = require("../middleware/authMiddleware");
const upload = multer();

router.post("/", auth, upload.single("image"), createTour);
router.get("/", getTours);
router.delete("/:id", auth, deleteTour);

module.exports = router;