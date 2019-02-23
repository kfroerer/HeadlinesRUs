var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({
//   defaultLayout: "main"
// }));
// app.set("view engine", "handlebars");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;
var app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/HeadlinesRUs", { useNewUrlParser: true });

//ROUTES

app.get("/scrape", function ( request, response) {
    axios.get("https://www.cnn.com/world").then(function(response){
        var $ = cheerio.load(response.data);
        
        var results = {};
        $("article").each(function(i, element) {
            results.title = $(this).find("h3").find("span").text();
            results.link = $(this).find("a").attr("href");
            console.log(results);
        })
         
        db.Article.create(results)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    })
    response.send("Scrape Complete");
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});