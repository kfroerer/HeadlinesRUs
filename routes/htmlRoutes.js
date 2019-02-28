var db = require("../models");

module.exports = function (app) {
    app.get("/", function(request, response) {
        db.Article.find({}).limit(30)
        .then(function(data) {
            return response.render("article", {
                article: data
            });
        })
    });
    

    
}