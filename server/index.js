// Express configuration
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const { join } = require("path");
const { PORT = 4003, HOST } = process.env;

// Database connection configuration
const mongoose = require("mongoose");
const dbConnection = require("./db/config");
mongoose.set("strictQuery", false);
dbConnection();

// File Uploads
const fileUpload = require("express-fileupload");
const fileUploadConfig = {
   useTempFiles: true,
   tempFileDir: "/tmp/",
   createParentPath: true,
};
app.use(fileUpload(fileUploadConfig));

// Test Endpoints
app.get("/", (req, res) => {
   res.json("Server ready");
});

app.get("/say-hi", (req, res) => {
   res.json("hi, I am a the latest version of a rest api created using node and express!");
})



// Authentication endpoints
// app.use("/api/auth", require("./routes/auth"));

// app.use("/api/tasks", require("./routes/tasks"));

// app.use("/api/uploads", require("./routes/uploads"));

// app.get("*", (req, res) => {
//    res.sendFile(join(__dirname, "../client/build/index.html"));
// });


// Print usefull info in console for development
app.listen(PORT, HOST, () =>
   console.log(`server running at http://${HOST || "localhost"}:${PORT}`)
);

// Todos: 
// x Connect To Database
// - Check users crud
// - List User and tasks as rest api endpoints
// - Migrate DB to my own mongo account
