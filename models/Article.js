var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },

  // `comment` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
