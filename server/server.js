const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tours", require("./routes/tourRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server running");
});