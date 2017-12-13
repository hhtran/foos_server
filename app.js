var express = require("express");
var path = require("path");

var usersRoutes = require("./routes/users");
var dogsRoutes = require("./routes/dogs");

var app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", usersRoutes);
app.use("/api", dogsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;
