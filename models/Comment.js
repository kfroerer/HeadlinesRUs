var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  body: String,
//   user: {
//       type: Schema.Types.ObjectId,
//       ref: 'user'
//   }  

});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
