var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

// Connect and handle connection errors
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

// Import models
require("./models/User");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

// Logging requests
app.use((req, res, next) => {
  const { method, url } = req;
  console.log(`Request received: ${method} ${url}`);

  next();
});

// Import routes
var routes = require("./routes");

// Register routes
app.use("/api", routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;
