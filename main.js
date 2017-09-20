var game;
var player1Array = [];
var player2Array = [];
$(document).ready(function() {

var timePerGo = 10; //global
var timeLeft;       //global
var timer;

$(".you-lose").hide();
$(".myTurn").toggleClass("myTurn");

$(".new-game").click(function(){
  game = new Boggle();                      // creates a new grid

  player1Array = [];
  player2Array = [];

      $(".myTurn").toggleClass("myTurn");
      $(".you-lose").hide();
      $(".clicked-letters").text(""); //clears any text from the old game
      $(".clicked-letters").empty();
      $(".cube").removeClass("clicked");
      $(".cube").css("background-color", "#ccf5ff");
      $(".cube").css("color", "#0074D9");
      $(".wordsPlayer1").text("");
      $(".wordsPlayer2").text("");

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
        $(this).prop("disabled", true);

        if(!$(this).hasClass("clicked")){
          $(this).css("background-color", "#39CCCC");
          $(this).css("color", "white");
          $(this).addClass("clicked");
          $(".clicked-letters").append($(this).text());
        }

        if($(".clicked-letters").text().length>=3){
          $(".submit").removeClass("disable");  //turns the submit button green
          $(".submit").prop("disabled", false); //makes the button clickable
        }
      });

      $(".player1").toggleClass("myTurn");

      if(timer!=null){
        clearInterval(timer);
      }

      timeLeft = timePerGo;
      $(".timer").text(timeLeft);

      var countdown = function(){
        if(timeLeft>1){
          timeLeft--;
          $(".timer").text(timeLeft);
        }
        else {
          $(".you-lose").show();
          $(".timer").text(0);
          $(".submit").prop("disabled", true);
          $(".submit").toggleClass("disable");
          clearInterval(timer);
        }
      };

      timer = setInterval(countdown, 1000);

      $(".submit").prop("disabled", true); //disables the button on 'new game' load

});

$(".submit").on("click", function(event){

  $(".submit").prop("disabled", true);

  var word = $(".clicked-letters").text();
  //alert(word);
  var wordLowerCase = word.toLowerCase();
  //alert(wordLowerCase);


if(wordList.indexOf(wordLowerCase)<0) {
  alert(word+" isn't in the dictionary, try again");
  event.preventDefault();
  $(".submit").toggleClass("disable");
  $(".clicked-letters").empty();
  $(".cube").removeClass("clicked");
  $(".cube").css("background-color", "#ccf5ff");
  $(".cube").css("color", "#0074D9");
}


  for(var wordToCheck = 0; wordToCheck<player1Array.length; wordToCheck++){
    if(
      ($(".clicked-letters").text())=== player1Array[wordToCheck]||
      ($(".clicked-letters").text())=== player2Array[wordToCheck])  {
        alert("this word has been used already, choose another word");
        event.preventDefault();
        $(".submit").toggleClass("disable");
        $(".clicked-letters").empty();
        $(".cube").removeClass("clicked");
        $(".cube").css("background-color", "#ccf5ff");
        $(".cube").css("color", "#0074D9"); // for player2, it double alerts.
    } else {

    }
  }

  if($(".clicked-letters").text().length>=3){
        $(".submit").toggleClass("disable"); //makes the button look clickable (i.e. green)

        if($(".player1").hasClass("myTurn")){

          player1Array.push($(".clicked-letters").text());
          var player1String = player1Array.join("\n");
          $(".wordsPlayer1").text(player1String);
        } else {
          player2Array.push($(".clicked-letters").text());
          var player2String = player2Array.join("\n");
          $(".wordsPlayer2").text(player2String);
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
        $(".timer").text(timeLeft);
        var countdown = function(){
          if(timeLeft>1){
            timeLeft--;
            $(".timer").text(timeLeft);
          }
          else {
            $(".you-lose").show();
            $(".timer").text(0);
            $(".submit").prop("disabled", true);
            $(".submit").toggleClass("disable");
            clearInterval(timer);
          }
        };

        timer = setInterval(countdown, 1000);
  }
});



});
