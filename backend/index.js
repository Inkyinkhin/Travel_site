const express = require("express");
const cors = require("cors");
const betterSqlite3 = require("better-sqlite3");
const landmarksRouter = require("./routes/landmarks");
const homeRouter = require("./routes/home");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/home", homeRouter);
app.use("/api/landmarks", landmarksRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
