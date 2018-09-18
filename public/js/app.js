// var instance = M.Carousel.init({
//     fullWidth: true
//   });

  // Or with jQuery

  
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
     

  // function displayResults(data){
  //   $(".article-results").empty;
  //   data.forEach(function(article){
  //     console.log(article);

  //     // var cardDiv = $("<div class='card'>");
  //     // var title = $("<div class='card-title'>").text(data[i].title)
  //   })
  // }

  // Receives json response from query to db in app.get("/all")
  $.getJSON("/all", function(data){
    $(".article-results").empty();
    data.forEach(function(article){
     
    var cardDiv = $("<div class='card'>").append(
      $("<div class='card-title'>").text(article.title),
      $("<div class='card-image'>").html("<img src='" + article.imageUrl + "'>"),
      $("<div class='card-content'>").html("<br>" + article.summary).append(article.link)

    );

    $(".article-results").append(cardDiv);
     
    });
    
  })