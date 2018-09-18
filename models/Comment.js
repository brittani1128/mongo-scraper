// Require mongoose
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create schema for Comment model
var CommentSchema = new Schema({
    body:String
});

// Mongoose will save ObjectId of each comment, this Id is referred to in Article

// Create Comment model
var Comment = mongoose.model("Comment", CommentSchema);


// Export the model
module.exports = Comment;