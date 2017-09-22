var game;
var player1Array = [];
var player2Array = [];
var clickedLetters="";

var yStart;
var xStart;

var yEnd;
var xEnd;

$(".gameOver").removeClass("you-lose"); // to stop image flashing briefly upon page load

$(document).ready(function() {

var timePerGo = 10; //global
var timeLeft;       //global
var timer;

var gameSetup = function(){
  $(".gameOver").removeClass("you-lose");
  $(".myTurn").toggleClass("myTurn");
  $(".submit").prop("disabled", true); //

  clickedLetters="";
  $(".clicked-letters").empty();
  $(".cube").removeClass("clicked"); //
  $(".wordsPlayer1").text("");
  $(".wordsPlayer2").text("");
  $(".cube").removeClass("fixed");
  $(".submit").addClass("disable");

  $(".svg").empty(); //
  xStart = undefined; //
  yStart = undefined; //

  player1Array = [];
  player2Array = [];
};

var countdownTimer = function(){
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
        $(".gameOver").addClass("you-lose");
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
};

gameSetup();

$(".new-game").click(function(){
    game = new Boggle();                      // creates a new grid

    gameSetup();

    $(".cube").effect( "bounce", {times: 4, direction: "up", distance: 50}, 900);

$(".cube").each(function(){
  $(this).text(game.grid[$(this).attr("y")][$(this).attr("x")]);
});

    $(".player1").toggleClass("myTurn"); // sets the turn to P1


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
      // END OF CLICK LOGIC

  countdownTimer();

});

//CLICK SUBMIT
$(".submit").on("click", function(event){

  $(".submit").prop("disabled", true); //in gameSetup

  $(".cube").removeClass("fixed"); // makes cubes clickable again. // in gameSetup
  $(".svg").empty();                // in gameSetup

  yStart=undefined; //in gameSetup
  xStart=undefined; //in gameSetup

  var wordLowerCase = clickedLetters.toLowerCase();

  var invalidWord = function(){
    $(".submit").toggleClass("disable");
    clickedLetters="";
    $(".clicked-letters").empty();
    $(".cube").removeClass("clicked");
  };

if(wordList.indexOf(wordLowerCase)<0) {
  $(".grid").addClass("fakeWord");
  setTimeout(function(){$(".grid").removeClass("fakeWord");},1500);
  $(".cube").hide();
  setTimeout(function(){$(".cube").show();},1500);
  invalidWord();
}


  for(var wordToCheck = 0; wordToCheck<player1Array.length; wordToCheck++){
    if((clickedLetters)=== player1Array[wordToCheck]||
      (clickedLetters)=== player2Array[wordToCheck])  {
        $(".grid").addClass("usedWord");
        setTimeout(function(){$(".grid").removeClass("usedWord");},1200);
        $(".cube").hide();
        setTimeout(function(){$(".cube").show();},1200);
        invalidWord();
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

    if($(".player2").hasClass("myTurn")){
      $(".wordsPlayer2").removeClass("myTurn");
      $(".wordsPlayer1").addClass("myTurn");
    } else if ($(".player1").hasClass("myTurn")){
      $(".wordsPlayer1").removeClass("myTurn");
      $(".wordsPlayer2").addClass("myTurn");
    }

        $(".player1").toggleClass("myTurn");
        $(".player2").toggleClass("myTurn");

        clickedLetters="";
        $(".clicked-letters").empty();
        $(".cube").removeClass("clicked");

        countdownTimer();
  }
});

});
