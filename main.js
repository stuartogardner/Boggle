var game;
$(document).ready(function() {

var timePerGo = 10; //global
var timeLeft;       //global
var timer;

$(".you-lose").hide();
$(".myTurn").toggleClass("myTurn");

$(".new-game").click(function(){
  game = new Boggle();                      // creates a new grid

      $(".myTurn").toggleClass("myTurn");
      $(".you-lose").hide();

      var flattenedGrid = _.flatten(game.grid); //asigns letters to the grid
      for(var m=0; m<flattenedGrid.length; m++){
        $("."+m).text(flattenedGrid[m]);
      }

      $(".cube").hover(function(){
        $(this).css("background-color", "#39CCCC");
      }, function(){
        if(!$(this).hasClass("clicked")){
          $(this).css("background-color", "#ccf5ff");
        }
      });

      $(".cube").on("click", function(){
        if(!$(this).hasClass("clicked")){
          $(this).css("background-color", "#39CCCC");
          $(this).css("color", "white");
          $(this).addClass("clicked");
          $(".clicked-letters").append($(this).text());
        }
      });

      $(".player1").toggleClass("myTurn");

      if(timer!=null){
        clearInterval(timer);
      }

      timeLeft = timePerGo;

      var countdown = function(){
        if(timeLeft>=0){
          $(".timer").text(timeLeft);
          timeLeft--;
        }
        else {
          $(".you-lose").show();
        }
      };

      timer = setInterval(countdown, 1000);

});



// add a warning if they click submit and the word is not 3+ letters
// need to check if the word has already been submitted
// highlight the submit button when the word is 3+ letters long

$(".submit").on("click", function(){

  if($(".clicked-letters").text().length>=3){

    if($(".player1").hasClass("myTurn")){
      $(".wordsPlayer1").append("<br>"+$(".clicked-letters").text());
    } else {
      $(".wordsPlayer2").append("<br>"+$(".clicked-letters").text());
    }

    $(".player1").toggleClass("myTurn");
    $(".player2").toggleClass("myTurn");

    $(".clicked-letters").empty();
    $(".cube").removeClass("clicked");
    $(".cube").css("background-color", "#ccf5ff");
    $(".cube").css("color", "#0074D9");

    if(timer!=null){
      clearInterval(timer);
    }

    timeLeft = timePerGo;

    var countdown = function(){
      if(timeLeft>=0){
        $(".timer").text(timeLeft);
        timeLeft--;
      }
      else {
        $(".you-lose").show();
      }
    };

    timer = setInterval(countdown, 1000);

  }
});



});
