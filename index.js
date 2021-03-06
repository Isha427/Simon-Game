var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;
var userClickedPattern = [];
$(document).keypress(function () {
       if (!started) {
              $("#level-title").text("level " + level);
              nextSequence();
              started = true;
       }
});
$(".btn").click(function () {
       var userChosenColour = $("this").attr("id");
       userClickedPattern.push(userChosenColour);

       playsound(userChosenColour);
       animatePress(userChosenColour);
       checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
       if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
              if (userClickedPattern.length === gamePattern.length) {
                     setTimeout(function () {
                            nextSequence();
                     }, 1000);
              }
       }
       else {
              playsound("wrong");
              $("body").addClass("game-over")
              $("#level-title").text("Game Over, Press Any Key to Restart");
              setTimeout(function () {
                     $("body").removeClass("game-over");
              }, 200)
              startOver();
       }

}

function nextSequence() {
       userClickedPattern = [];
       level++;
       $("#level-title").text("Level " + level);

       var randomNumber = Math.floor(Math.random() * 4);
       var randomChosenColour = buttonColours[randomNumber];
       gamePattern.push(randomChosenColour);

       $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
       playsound(randomChosenColour);
}

function animatePress(currentColor) {
       $("#" + currentColor).addClass("pressed");
       setTimeout(function () {
              $("#" + currentColor).removeClass("pressed");
       }, 100);
}
function playsound(soundname) {
       var audio = new Audio(soundname + ".mp3");
       audio.play();

}

function startOver() {
       level = 0;
       gamePattern = [];
       started = false;
}