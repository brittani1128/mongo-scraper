
//TO DO

//Currently: scraping site, storing info in db, getting results from db in json format

//Need to populate html with scraped data results
//Save button option to save article (adds saved attribute)
//  Create saved articles route to display all saved articles


// Dependencies
var express = require("express");
var mongojs = require("mongojs");


var request = require("request");
var cheerio = require("cheerio");

var exphbs = require("express-handlebars");
var path = require("path");

// Initialize Express
var app = express();
app.use(express.static("public"));

// Database configuration
var databaseUrl = "hwScraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

//ROUTES =============================================

// Main route (simple Hello World Message); gets overridden by setting express.static(public)
app.get("/", function(req, res) {
    res.send("Hello World");
});


// Retrieves data from scrapedData collection
app.get("/all", function(req,res){
  db.scrapedData.find({}, function(error, found){
    if (error){
      console.log(error);
    }
    else {
        //sends data response in json
        res.json(found);
    }
  });
});


// Scrapes website for articles and adds to scrapedData collection
app.get("/scrape", function(req,res){

  request("https://www.npr.org/sections/news/", function(error, response, html){
    var $ = cheerio.load(html);
    
    //THE ONION
    // var articleBlock = $(".curation-module__item__wrapper");
    // $(articleBlock).each(function(i, element) {

    //   var imageUrl = $(element).children(".image-container-wrapper").children(".image-container").children("a").children("img").attr("data-src");
    //   var title = $(element).children(".content-wrapper").children(".content-meta__headline").children(".content-meta__headline__wrapper").children("h6").text();
    //   var summary = $(element).children(".content-meta__excerpt").text();
    //   var link = $(element).attr("data-permalink");

      
    //NPR

        $("article").each(function(i, element){
            // var imageUrl = $(element).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-src");
            var title = $(element).children(".item-info").children(".title").children("a").text();
            var summary = $(element).children(".item-info").children(".teaser").children("a").text();
            var link = $(element).children(".item-info").children(".title").children("a").attr("href");

            if (title && link && summary) {
                db.scrapedData.insert({
                    title:title, 
                    link:link, 
                    // imageUrl:imageUrl, 
                    summary:summary, 
                    saved:false
                },
                function(err, inserted){
                  if (err) {
                    console.log(err);
                  }
                  else {
                    console.log(inserted);
                  }
                });
            }        
        });
  });
  res.send("Scrape Complete");
});


app.get("/saved", function(req, res){
    db.scrapedData.find().sort({_id:1}, function(error, data){
        if (error){
            console.log(error)
          }
          else {
            res.json(data);
          }
    })
})



// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
