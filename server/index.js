const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./db/config");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const { join } = require("path");


mongoose.set("strictQuery", false);
dbConnection();

const app = express();
app.use(cors());
app.use(express.json());

const fileUploadConfig = {
   useTempFiles: true,
   tempFileDir: "/tmp/",
   createParentPath: true,
};

const { PORT = 4003, HOST } = process.env;

app.use(fileUpload(fileUploadConfig));

app.get("/", (req, res) => {
   res.json("Server ready");
});

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
