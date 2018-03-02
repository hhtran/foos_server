const express = require("express");
const path = require("path");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const { productionErrors, developmentErrors } = require("./errorHandlers");
const passport = require("passport");
const cookieSession = require("cookie-session");

// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", err => {
  console.error(err.message);
});
require("./models/Post");

const app = express();
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require("./handlers/passport");

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
app.use("/api/public/uploads", express.static("static/public/uploads"));

// Error logging
if (app.get("env") === "development") {
  app.use(developmentErrors);
}

app.use(productionErrors);

module.exports = app;
