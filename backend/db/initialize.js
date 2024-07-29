const Database = require("better-sqlite3");
const db = new Database("db/landmarks.db");

const createLandmarksTable = `
  CREATE TABLE IF NOT EXISTS landmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    city_name TEXT,
    description TEXT,
    lad REAL,
    lung REAL
  )
`;

// Create City Table
const createCityTable = `
  CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    lad REAL,
    lung REAL
  )
`;

// Create Images Table
const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    landmark_id INTEGER,
    image_url TEXT,
    FOREIGN KEY (landmark_id) REFERENCES landmarks (id) ON DELETE CASCADE
  )
`;

db.exec(createLandmarksTable);
db.exec(createCityTable);
db.exec(createImagesTable);

console.log("Database initialized.");
