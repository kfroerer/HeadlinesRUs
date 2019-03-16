var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


var db = require("./models");

var PORT = 3000;
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/HeadlinesRUs";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);
//ROUTES

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;