const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const multer = require("multer");
const path = require("path");

// Database initialization
const db = new Database("db/landmarks.db");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Save uploaded files to 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to filename
  },
});
const upload = multer({ storage: storage });

// POST /api/upload
router.post("/", upload.array("images", 5), (req, res) => {
  const { name, location, description } = req.body;
  const images = req.files.map((file) => ({
    path: `/uploads/${file.filename}`,
  }));

  try {
    const stmt = db.prepare(
      "INSERT INTO landmarks (name, location, description) VALUES (?, ?, ?)"
    );
    const { lastInsertRowid } = stmt.run(name, location, description);

    images.forEach((image) => {
      db.prepare("INSERT INTO images (landmark_id, path) VALUES (?, ?)").run(
        lastInsertRowid,
        image.path
      );
    });

    res.status(201).json({ message: "Landmark uploaded successfully" });
  } catch (error) {
    console.error("Error uploading landmark:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
