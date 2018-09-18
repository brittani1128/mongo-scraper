
//TO DO

//Currently: scraping site, storing info in db, getting results from db in json format
//Mongoose with Models
//Handlebars
//Need to populate html with scraped data results
//Save button option to save article (adds saved attribute)
//  Create saved articles route to display all saved articles
//  Comment btn on each saved article


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


// Routing


//ROUTES =============================================

// Main route that finds all articles from db
app.get("/", function(req, res) {
  Article.find({saved:false}, function(error, data){
    if (error){
      console.log(error);
      res.status(500).send(error);
    }
    else {
      console.log(data)
        //sends data response in json to index.handlebars file
        res.render("index", {data:data});
    }
  });
    
});



// Scrapes website for articles and adds to Article collection
app.get("/scrape", function(req,res){

  // scrape NPR science section
  request("https://www.npr.org/sections/science/", function(error, response, html){
    var $ = cheerio.load(html);
    
        $("article.has-image").each(function(i, element){

          var newArticle = {};

            newArticle.imageUrl = $(element).children(".item-image").children(".imagewrap").children("a").children("img").attr("src");
            newArticle.title = $(element).children(".item-info").children(".title").children("a").text();
            newArticle.summary = $(element).children(".item-info").children(".teaser").children("a").text();
            newArticle.link = $(element).children(".item-info").children(".title").children("a").attr("href");

          // Create new Article model with scraped article info
          var newEntry = new Article(newArticle);

          // Save new Article in db
          newEntry.save(function(err,saved){
            if (err){
              console.log(err);
            } else {
              console.log(saved)
            }
          });
       
        });

        // Redirect back to home page when finished
        res.redirect("/");
  });
});


// app.get("/saved", function(req, res){
//     db.scrapedData.find().sort({_id:1}, function(error, data){
//         if (error){
//             console.log(error)
//           }
//           else {
//             res.json(data);
//           }
//     })
// })



// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
