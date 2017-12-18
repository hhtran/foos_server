const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const { productionErrors, developmentErrors } = require("./errorHandlers");

// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
mongoose.connection.on("error", err => {
  console.error(err.message);
});
require("./models/User");
require("./models/Post");

const app = express();
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
const routes = require("./routes");

// Register routes
app.use("/api", routes);

// Error logging
if (app.get("env") === "development") {
  app.use(developmentErrors);
}

app.use(productionErrors);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;
