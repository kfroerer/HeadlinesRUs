var db = require("../models");

module.exports = function (app) {
    app.get("/", function(request, response) {
        db.Article.find({})
        .then(function(data) {
            return response.render("article", {
                article: data
            });
        })
    });
    

    
}