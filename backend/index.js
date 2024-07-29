const express = require("express");
const cors = require("cors");
const betterSqlite3 = require("better-sqlite3");
const landmarksRouter = require("./routes/landmarks");
const homeRouter = require("./routes/home");
const path = require("path");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// =======================================================================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Example endpoint to retrieve multiple image paths
app.get("/api/uploads", (req, res) => {
  // Array of image paths (for demonstration purposes)
  const imagePaths = [
    "/uploads/1721287415996.jpg",
    "/uploads/1721891124346.jpg",
  ];

  res.json({ imagePaths });
});

// =======================================================================

// Routes
app.use("/api/home", homeRouter);
app.use("/api/landmarks", landmarksRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
