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
        //need to validate and check for duplicates
        db.Article.insertMany(results)
        .then(function(docs) {
          console.log(docs);
        })
        .catch(function(err) {
          console.log(err);
        });
    })
    response.send("Scrape Complete");
});

//route for getting all the articles from db
app.get("/articles", function (request, response ){ 
    db.Article.find({})
    .then(function(result){
        response.json(result);
    })
    .catch(function(err) {
        response.json(err)
    });
});

//returns specific article with comment
app.get("/articles/:id", function (request, response) {
    db.Article.findOne({_id: request.params.id})
    .populate("comment")
    .then(function(result) {
        response.json(result)
    })
    .catch(function(err){
        response.json(err)
    });
});

//save an article's commment
app.post("/articles/:id", function(request, response) {
    db.Comment.create(request.body)
    .then(function(newComment){
        return db.Article.findOneAndUpdate({_id: request.params.id}, {comment: newComment._id}, {new: true});
    })
    .then(function(updatedArticle){
        response.json(updatedArticle);
    })
    .catch(function(err){
        response.json(err);
    });
})


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});