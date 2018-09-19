// DEPENDENCIES

var express = require("express");
var exphbs = require("express-handlebars");
var Article = require("../models/Article");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var router = express.Router();

// Database configuration with mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
var db = mongoose.connection;
mongoose.connect(MONGODB_URI);

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Main route that finds all articles from db
router.get("/", function (req, res) {
  Article.find({}, function (error, data) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }
    else {

      console.log(data)
      //sends data response in json to index.handlebars file
      res.render("index", { data: data, saved: false });
    }
  });

});

// Route to render all saved articles
router.get("/saved", function (req, res) {
  Article.find({ saved: true }, function (error, data) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }
    else {
      res.render("saved", { data: data, saved: true });
    }
  })
})

module.exports = router;