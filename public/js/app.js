
    $(document).ready(function () { 

  // function displayResults(data){
  //   $(".article-results").empty;
  //   data.forEach(function(article){
  //     console.log(article);

  //     // var cardDiv = $("<div class='card'>");
  //     // var title = $("<div class='card-title'>").text(data[i].title)
  //   })
  // }

  // Receives json response from query to db in app.get("/all")
  // $.getJSON("/all", function(data){
  //   $(".article-results").empty();
  //   data.forEach(function(article){
     
  //   var cardDiv = $("<div class='card'>").append(
  //     $("<div class='card-title'>").text(article.title),
  //     $("<div class='card-image'>").html("<img src='" + article.imageUrl + "'>"),
  //     $("<div class='card-content'>").html("<br>" + article.summary).append(article.link)

  //   );

  //   $(".article-results").append(cardDiv);
     
  //   });
    
  // })

  $(".save-btn").on("click", function(req,res){
    console.log("save!");
    var articleId = $(this).attr("data-id");
    console.log(articleId)

    $.ajax({
      url: "/api/saved/"+ articleId,
      method: "POST"
    });
  
  });

  $(".remove-btn").on("click", function(req,res){
    console.log("remove!");
    var articleId = $(this).attr("data-id");
    console.log(articleId)

    $.ajax({
      url: "/api/removed/"+ articleId,
      method: "POST"
    });
  
  });

  $(".comment-btn").on("click", function(req,res){
    console.log("comment!");
    var articleId = $(this).attr("data-id");
    console.log(articleId)

    //modal pop open to leave comment

    // $.ajax({
    //   url: "/api/removed/"+ articleId,
    //   method: "POST"
    // });
  
  });








})