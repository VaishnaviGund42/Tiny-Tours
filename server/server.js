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

// Serve static files in both dev and prod
const clientBuildPath = path.join(__dirname, "..", "client", "latest", "dist");
app.use(express.static(clientBuildPath));

// Add favicon handling
app.get('/favicon.svg', (req, res) => {
  const faviconPath = path.join(clientBuildPath, 'favicon.svg');
  if (require('fs').existsSync(faviconPath)) {
    res.sendFile(faviconPath);
  } else {
    res.status(404).send('Favicon not found');
  }
});

// Catch-all for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  module.exports = app;
}