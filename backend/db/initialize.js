const Database = require("better-sqlite3");
const db = new Database("db/landmarks.db");

// Create Landmarks Table
const createLandmarksTable = `
  CREATE TABLE IF NOT EXISTS landmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT,
    description TEXT
  )
`;

// Create Images Table
const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    landmark_id INTEGER,
    path TEXT,
    FOREIGN KEY (landmark_id) REFERENCES landmarks (id) ON DELETE CASCADE
  )
`;

db.exec(createLandmarksTable);
db.exec(createImagesTable);

console.log("Database initialized.");
