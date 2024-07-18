const express = require("express");
const Database = require("better-sqlite3");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const db = new Database("db/landmarks.db");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create a new landmark with images
router.post("/add_landmark", upload.array("images", 10), (req, res) => {
  console.log("triggered");
  const { name, location, description } = req.body;
  const stmt = db.prepare(
    "INSERT INTO landmarks (name, location, description) VALUES (?, ?, ?)"
  );
  const info = stmt.run(name, location, description);
  const landmarkId = info.lastInsertRowid;

  if (req.files) {
    const imgStmt = db.prepare(
      "INSERT INTO images (landmark_id, path) VALUES (?, ?)"
    );
    for (const file of req.files) {
      imgStmt.run(landmarkId, file.path);
    }
  }

  res.json({ id: landmarkId });
});

// Update a landmark
router.put("/update_landmark/:id", (req, res) => {
  const { name, location, description } = req.body;
  const stmt = db.prepare(
    "UPDATE landmarks SET name = ?, location = ?, description = ? WHERE id = ?"
  );
  const info = stmt.run(name, location, description, req.params.id);
  if (info.changes > 0) {
    res.send("Landmark updated");
  } else {
    res.status(404).send("Landmark not found");
  }
});

// Delete a landmark
router.delete("/delete_landmark/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM landmarks WHERE id = ?");
  const info = stmt.run(req.params.id);
  if (info.changes > 0) {
    res.send("Landmark deleted");
  } else {
    res.status(404).send("Landmark not found");
  }
});

module.exports = router;
