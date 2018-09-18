
var express = require("express");
var exphbs = require("express-handlebars");
var Article = require("../models/Article");

var router = express.Router();



// Main route that finds all articles from db
router.get("/", function(req, res) {
    Article.find({}, function(error, data){
      if (error){
        console.log(error);
        res.status(500).send(error);
      }
      else {
        
        console.log("=================================", data)
          //sends data response in json to index.handlebars file
          res.render("index", {data: data, saved:false});
      }
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

module.exports = router;