var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

var router = express.Router();





// Route to scrape website for articles and adds to Article collection
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

  // Route to add article to saved list
  router.post("/api/saved/:id", function(req,res){
    Article.findOneAndUpdate({_id:req.params.id}, {saved:true}, function(err,data){
      if (err){
        console.log(err);
      } else {
        console.log("data removed", data)
      }
    });
  });

  // Route to remove article from saved list
  router.post("/api/removed/:id", function(req,res){
    Article.findOneAndUpdate({_id:req.params.id}, {saved:false}, function(err,data){
      if (err){
        console.log(err);
      } else {
        console.log("data removed", data)
      }
      
    });
  });

  // Route to add comments
  router.post("/api/comments/:id", function(req,res){
    // create new Comment moel
    Comment.create(req.body).then(function(dbComment){
      // update Article model with new comment id
      Article.findOneAndUpdate({_id:req.params.id},{comment:dbComment._id}, {new:true})
      // send json response
    }).then(function(dbArticle){
      res.json(dbArticle);
    }).catch(function(err){
      res.json(err);
    });
  });

  // Route to display comments
  router.get("/api/comments/:id", function(req,res){
    // find article with associated ID
    Article.findOne({_id:req.params.id})
    // populate Article with comments
      .populate("comment")
      .then(function(err,commentData){
        if (err){
          console.log(err);
        } else {
          res.render("saved", {commentData:commentData});
        }
      });
  });

  router.delete("/clear", function(req,res){
    Article.remove({}, function(err){
      if (err){
        console.log(err)
      } else {
          console.log("Removed all articles")
      }
    })
    res.redirect("/");
  })
  
  module.exports = router;