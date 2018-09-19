
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


// Database configuration with mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
var db = mongoose.connection;
mongoose.connect(MONGODB_URI);


// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


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


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
