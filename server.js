
// DEPENDENCIES ==========================================================
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");





// Initialize Express
var app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));


// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");


// Require all models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");


// Require routing controllers
var htmlRoutes = require("./controllers/html-routes.js");
var articleRoutes = require("./controllers/article-routes.js");


// Routing
app.use("/", htmlRoutes);
app.use("/", articleRoutes);

var PORT = process.env.PORT || 3000
// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
