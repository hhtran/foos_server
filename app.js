var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

var usersRoutes = require("./routes/users");
var dogsRoutes = require("./routes/dogs");

mongoose.connect("mongodb://localhost/basic-react-express-database");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", usersRoutes);
app.use("/api", dogsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

var User = require("./models/User");
const riley = new User({
  name: "Riley",
  username: "rilddey",
  password: "hello123"
});

riley.save(function(err) {
  if (err) throw err;

  console.log("User saved successfully!");
});

module.exports = app;
