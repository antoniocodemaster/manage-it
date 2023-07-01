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

// Api Responses
app.get("/", (req, res) => {
   res.json("Server ready");
});

app.get("/say-hi", (req, res) => {
   res.json("hi, I am a rest api created using node and express!");
})

// app.use("/api/tasks", require("./routes/tasks"));

// app.use("/api/auth", require("./routes/auth"));

// app.use("/api/uploads", require("./routes/uploads"));

// app.get("*", (req, res) => {
//    res.sendFile(join(__dirname, "../client/build/index.html"));
// });

app.listen(PORT, HOST, () =>
   console.log(`server running at http://${HOST || "localhost"}:${PORT}`)
);


// Todos: 
// - Connect To Database
// - List User and tasks as rest api endpoints
// - Migrate DB to my own mongo account
