const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("db/landmarks.db");

// GET /api/home
router.get("/", (req, res) => {
  try {
    const landmarks = db.prepare("SELECT * FROM landmarks").all();

    landmarks.forEach((landmark) => {
      const images = db
        .prepare("SELECT path FROM images WHERE landmark_id = ?")
        .all(landmark.id);
      landmark.images = images.map((image) => image.path);
    });

    res.json(landmarks);
  } catch (err) {
    console.error("Error fetching landmarks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
