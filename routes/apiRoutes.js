var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function(app){
app.get("/scrape", function ( request, response) {
    axios.get("https://www.cnn.com/world").then(function(response){
        var $ = cheerio.load(response.data);
        
        var results = [];
        $("article").each(function(i, element) {
            var article = {};
            article.title = $(element).find("h3").find("span").text();
            article.link = $(element).find("a").attr("href");
            
            
            if (!article.title || !article.link){
                return console.log("Article not found");
            }else{            
            results.push(article);
            console.log(results)
            };
        })
        db.Article.find({})

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
    db.Article.find({}).limit(30)
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


};