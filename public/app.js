// $.getJSON("/articles", function(data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//         $(#articles). 
//     }

//   });
var db = require('../models');

$('#deleteBtn').on("click", function(event) {
    event.preventDefault();
    db.Article.deleteMany({})
    console.log("deleted")
});