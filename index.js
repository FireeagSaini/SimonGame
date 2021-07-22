var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var levelNumber = 0;
var indexNumber = 0;

$(document).keypress(function (){
  nextSequence();
  $("h1").text("Level " + levelNumber);
})

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
  animatePress(userChosenColor);
  indexNumber++;
  patternCheck();
});

function patternCheck(){
  if(indexNumber==levelNumber){
    for(var i=0;i<=gamePattern.length;i++){
      if(gamePattern[i]!=userPattern[i]){
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function (){
          $("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press Any Key to Restart...");
        startOver();
        // break;
      }
    }
    nextLevel(levelNumber);
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  animatePress(randomChosenColor);
  userPattern = [];
  levelNumber++;
  indexNumber = 0;
  if(levelNumber!=0){
    $(document).unbind();
  }
}

function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");}, 100);
}

function nextLevel(a){
  if(a!=0){
    setTimeout(function(){
      nextSequence();  $("h1").text("Level " + levelNumber);}, 1000);
  }
}

function startOver(){
  gamePattern = [];
  userPattern = [];
  levelNumber = 0;
  $(document).keypress(function (){
    nextSequence();
    $("h1").text("Level " + levelNumber);
  })
}
