const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./db/config");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const { join } = require("path");

mongoose.set("strictQuery", false);

const { PORT = 4003, HOST } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

dbConnection();

const fileUploadConfig = {
   useTempFiles: true,
   tempFileDir: "/tmp/",
   createParentPath: true,
};

app.use(fileUpload(fileUploadConfig));

app.use(express.static(join(__dirname, "../client/build")));

app.get("/", (req, res) => {
   res.json("Server ready");
});

app.use("/api/tasks", require("./routes/tasks"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/uploads", require("./routes/uploads"));

app.get("*", (req, res) => {
   res.sendFile(join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, HOST, () =>
   console.log(`server running at http://${HOST || "localhost"}:${PORT}`)
);
