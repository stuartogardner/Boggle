var game;
var player1Array = [];
var player2Array = [];
var clickedLetters="";

var yStart;
var xStart;

var yEnd;
var xEnd;

$(document).ready(function() {

var timePerGo = 10; //global
var timeLeft;       //global
var timer;

$(".you-lose").hide();
$(".myTurn").toggleClass("myTurn");
$(".submit").prop("disabled", true); //disables the button on page load

$(".new-game").click(function(){
  game = new Boggle();                      // creates a new grid

  player1Array = [];
  player2Array = [];

      $(".myTurn").toggleClass("myTurn");
      $(".you-lose").hide();
      clickedLetters="";
      $(".clicked-letters").empty();
      $(".cube").removeClass("clicked");
      $(".wordsPlayer1").text("");
      $(".wordsPlayer2").text("");
      $(".cube").removeClass("fixed");
      $(".submit").prop("disabled", true); //disables the button on 'new game' load
      $(".submit").addClass("disable");

      $(".cube").effect( "bounce", {times: 4, direction: "up", distance: 50}, 900);

      $(".svg").empty();
      xStart = undefined;
      yStart = undefined;

      var flattenedGrid = _.flatten(game.grid); //asigns letters to the grid
      for(var m=0; m<flattenedGrid.length; m++){
        $("."+m).text(flattenedGrid[m]);
      }


// CLICK
      $(".cube").on("click", function(){

        $(this).addClass("fixed");

        var index = ($(".cube").index(this));

        if(index===0){
          $(".1,.4,.5").removeClass("fixed");
          $(".2,.3,.6,.7,.8,.9,.10,.11,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===1){
          $(".0,.2,.4,.5,.6").removeClass("fixed");
          $(".3,.7,.8,.9,.10,.11,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===2){
          $(".1,.3,.5,.6,.7").removeClass("fixed");
          $(".0,.4,.8,.9,.10,.11,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===3){
          $(".2,.6,.7").removeClass("fixed");
          $(".0,.1,.4,.5,.8,.9,.10,.11,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===4){
          $(".0,.1,.5,.8,.9").removeClass("fixed");
          $(".2,.3,.6,.7,.10,.11,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===5){
          $(".0,.1,.2,.4,.6,.8,.9,.10").removeClass("fixed");
          $(".3,.7,.11,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===6){
          $(".1,.2,.3,.5,.7,.9,.10,.11").removeClass("fixed");
          $(".0,.4,.8,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===7){
          $(".2,.3,.6,.10,.11").removeClass("fixed");
          $(".0,.1,.4,.5,.8,.9,.12,.13,.14,.15").addClass("fixed");
        }

        if(index===8){
          $(".4,.5,.9,.12,.13").removeClass("fixed");
          $(".0,.1,.2,.3,.6,.7,.10,.11,.14,.15").addClass("fixed");
        }

        if(index===9){
          $(".4,.5,.6,.8,.10,.12,.13,.14").removeClass("fixed");
          $(".0,.1,.2,.3,.7,.11,.15").addClass("fixed");
        }

        if(index===10){
          $(".5,.6,.7,.9,.11,.13,.14,.15").removeClass("fixed");
          $(".0,.1,.2,.3,.4,.8,.12").addClass("fixed");
        }

        if(index===11){
          $(".6,.7,.10,.14,.15").removeClass("fixed");
          $(".0,.1,.2,.3,.4,.5,.8,.9,.12,.13").addClass("fixed");
        }

        if(index===12){
          $(".8,.9,.13").removeClass("fixed");
          $(".0,.1,.2,.3,.4,.5,.6,.7,.10,.11,.14,.15").addClass("fixed");
        }

        if(index===13){
          $(".8,.9,.10,.12,.14").removeClass("fixed");
          $(".0,.1,.2,.3,.4,.5,.6,.7,.11,.15").addClass("fixed");
        }

        if(index===14){
          $(".9,.10,.11,.13,.15").removeClass("fixed");
          $(".0,.1,.2,.3,.4,.5,.6,.7,.8,.12").addClass("fixed");
        }

        if(index===15){
          $(".10,.11,.14").removeClass("fixed");
          $(".0,.1,.2,.3,.4,.5,.6,.7,.8,.9,.12,.13").addClass("fixed");
        }

        if(!$(this).hasClass("clicked")){
          $(this).addClass("clicked");
          clickedLetters+=$(this).text(); // adding letters to the variable clickedLetters
          $(".clicked-letters").text(clickedLetters); // div clicked-letters shows the word


          if(xStart === undefined && yStart === undefined){
            yStart = $(this).attr("y");
            xStart = $(this).attr("x");

          } else {

            yEnd = $(this).attr("y");
            xEnd = $(this).attr("x");

            var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            newLine.setAttribute('x1', (xStart*100)+50);
            newLine.setAttribute('y1', (yStart*100)+50);
            newLine.setAttribute('x2', (xEnd*100)+50);
            newLine.setAttribute('y2', (yEnd*100)+50);
            $('.svg').append(newLine);

            yStart = yEnd;
            xStart = xEnd;

            yEnd = undefined;
            xEnd = undefined;
          }
        }


        if(clickedLetters.length>=3){
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
          $(".submit").addClass("disable");
          clearInterval(timer);
          $(".svg").empty();
          clickedLetters="";
          $(".clicked-letters").empty();
        }
      };

      timer = setInterval(countdown, 1000);



});

$(".submit").on("click", function(event){

  $(".submit").prop("disabled", true);

  $(".cube").removeClass("fixed"); // makes cubes clickable again.
  $(".svg").empty();

  yStart=undefined;
  xStart=undefined;

  var wordLowerCase = clickedLetters.toLowerCase();

if(wordList.indexOf(wordLowerCase)<0) {
  alert(clickedLetters+" isn't in the dictionary, try again");
  event.preventDefault();
  $(".submit").toggleClass("disable");
  clickedLetters="";
  $(".clicked-letters").empty();
  $(".cube").removeClass("clicked");
}


  for(var wordToCheck = 0; wordToCheck<player1Array.length; wordToCheck++){
    if(
      (clickedLetters)=== player1Array[wordToCheck]||
      (clickedLetters)=== player2Array[wordToCheck])  {
        alert("this word has been used already, choose another word");
        event.preventDefault();
        $(".submit").toggleClass("disable");
        clickedLetters="";
        $(".clicked-letters").empty();
        $(".cube").removeClass("clicked");

    } else {

    }
  }

  if(clickedLetters.length>=3){
        $(".submit").toggleClass("disable"); //makes the button look clickable (i.e. green)

        if($(".player1").hasClass("myTurn")){

          player1Array.push(clickedLetters);
          var player1String = player1Array.join("\n");
          $(".wordsPlayer1").text(player1String);
        } else {
          player2Array.push(clickedLetters);
          var player2String = player2Array.join("\n");
          $(".wordsPlayer2").text(player2String);
        }

        $(".player1").toggleClass("myTurn");
        $(".player2").toggleClass("myTurn");

        clickedLetters="";
        $(".clicked-letters").empty();
        $(".cube").removeClass("clicked");

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
            $(".submit").addClass("disable");
            clearInterval(timer);
            $(".svg").empty();
          }
        };

        timer = setInterval(countdown, 1000);
  }
});



});
