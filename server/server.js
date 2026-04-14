const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "https://tiny-tours.vercel.app"], methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tours", require("./routes/tourRoutes"));

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "client", "latest", "dist");

  app.use(express.static(clientBuildPath));


   app.use((req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});