const express = require("express");
const dbConnection = require("./db/config");
const cors = require("cors");
require("dotenv").config();
const { join } = require("path");

const { PORT = 4003, HOST } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

dbConnection();

app.use(express.static(join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.json("Server ready");
});

app.use("/api/tasks", require("./routes/tasks"));

app.use("/api/auth", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, HOST, () =>
  console.log(`server running at http://${HOST || "localhost"}:${PORT}`)
);
