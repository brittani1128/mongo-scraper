
    function generateModal(comments, articleId){
      $("#comments-list").empty();

    }
    
    $('.modal').modal();
    

    var globalId;

  $(document).ready(function () { 


  $(".save-btn").on("click", function(req,res){
    
    // save article id of button 
    var articleId = $(this).attr("data-id");
    console.log(articleId);

    // save instance of button to update color
    var thisBtn = $(this);

    $.ajax({
      url: "/api/saved/"+ articleId,
      method: "POST"
    })

    thisBtn.removeClass("save-btn");
    thisBtn.addClass("unsave-btn");
    thisBtn.text("Unsave")
    
  
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

    var articleId = $(this).attr("data-id");
    globalId = articleId;
    console.log(globalId);
    $('#modal1').modal('open');
   
    // $("#new-comment-field").text("");
    //modal pop open to leave comment

    // $.ajax({
    //   url: "/api/removed/"+ articleId,
    //   method: "POST"
    // });
  
  });

  $(".add-comment-btn").on("click", function(req,res){
    var commentInput = $("#new-comment-field").val().trim();
    console.log(commentInput);
    console.log(globalId);
    if (commentInput === "") {
      return alert("Please enter a comment before adding");
    };
    var id = globalId;

    $.ajax({
      method: "POST",
      url: "/api/comments/" + id,
      data: {
        body: commentInput
      }
    }).then(function (data) {
      // globalId = "";
      $("#new-comment-field").val("");
    });
    // $.getJSON("/api/getData?id=" + id, function (data) {
    //   var comments = data.comments;
    //   generateModal(comments, id);
    // });
  
  })
 
$("#clear-all-btn").on("click", function(req,res){
  $.ajax({
    url:"/clear",
    method:"DELETE"
    
  })
  window.location.href= ("/");
})





})