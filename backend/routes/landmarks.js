const express = require("express");
const Database = require("better-sqlite3");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const router = express.Router();
const db = new Database("db/landmarks.db");

// insert cities

const csvFilePath = path.join(__dirname, "cities/rakhine.csv");
const results = [];
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const stmt = db.prepare(
      "INSERT INTO cities (name, lad, lung) VALUES (?, ?, ?)"
    );
    const insertMany = db.transaction((cities) => {
      for (const city of cities) {
        stmt.run(city.City, parseFloat(city.lat), parseFloat(city.long));
      }
    });
    try {
      insertMany(results);
      console.log("Data inserted successfully");
    } catch (error) {
      console.error("Failed to insert data", error);
    }
  });

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
  const { name, location, description, latitude, longitude } = req.body;
  console.log(req.body);
  // check city ID

  const stmt = db.prepare(
    "INSERT INTO landmarks (name ,location, description, lad, lung ) VALUES (?, ?, ?,?,?)"
  );
  const info = stmt.run(name, location, description, latitude, longitude);
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

router.get("/get_landmarks/:location", (req, res) => {
  const { location } = req.params;

  try {
    // Prepare the query with a placeholder for the location parameter
    const stmt = db.prepare("SELECT * FROM landmarks WHERE location = ?");

    // Execute the query synchronously
    const rows = stmt.all(location);

    // Send back the rows as JSON
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  } finally {
    // Finalize the statement after use (optional with better-sqlite3)
    if (stmt) stmt.finalize();
  }
});

router.get("/get_landmarks/", (req, res) => {
  try {
    // Prepare the query with a placeholder for the location parameter
    const stmt = db.prepare("SELECT * FROM landmarks");

    // Execute the query synchronously
    const rows = stmt.all();

    // Send back the rows as JSON
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  } finally {
    // Finalize the statement after use (optional with better-sqlite3)
    if (stmt) stmt.finalize();
  }
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
