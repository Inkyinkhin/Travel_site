const Database = require("better-sqlite3");
const db = new Database("db/landmarks.db");

// Create Landmarks Table
const createLandmarksTable = `
  CREATE TABLE IF NOT EXISTS landmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id INTEGER,
    name TEXT,
    location TEXT,
    description TEXT,
    lad REAL,
    lung REAL,
    FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE CASCADE
  
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
    path TEXT,
    FOREIGN KEY (landmark_id) REFERENCES landmarks (id) ON DELETE CASCADE
  )
`;

db.exec(createLandmarksTable);
db.exec(createCityTable);
db.exec(createImagesTable);

console.log("Database initialized.");
