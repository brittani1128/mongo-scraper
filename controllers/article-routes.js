var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

var router = express.Router();





// Scrapes website for articles and adds to Article collection
router.get("/scrape", function(req,res){

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
                console.log("saved ==================" + saved)
              }
            });
         
          });
  
          // Redirect back to home page when finished
          res.redirect("/");
    });
  });

  router.post("/api/saved/:id", function(req,res){
    Article.findOneAndUpdate({_id:req.params.id}, {saved:true}, function(err,data){
      if (err){
        console.log(err);
      } else {
        console.log("data saved", data)
      }
    });
  });

  router.post("/api/removed/:id", function(req,res){
    Article.findOneAndUpdate({_id:req.params.id}, {saved:false}, function(err,data){
      if (err){
        console.log(err);
      } else {
        console.log("data removed", data)
      }
      
    });
  });
  
  module.exports = router;