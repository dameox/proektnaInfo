var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern =  [];
var userClickedPattern = [];
var startGame = 0;
var level = 0;
var highscore = 0;


//  FUNCTIONS  //

//takes random number assigns it to an array of colors adds sound and animation to the box with the id of that color and increments the level
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("h1").html("Level " + level);
}

// plays sound depending on the color passed to the parameter
function playSound(color) { 
    switch (color) {
        case "red":
            var red1 = new Audio("/sounds/red.mp3");
            red1.play();
            break;
        case "green":
            var green1 = new Audio("/sounds/green.mp3");
            green1.play();
            break;
        case "blue":
            var blue1 = new Audio("/sounds/blue.mp3");
            blue1.play();
            break;
        case "yellow":
            var yellow1 = new Audio("/sounds/yellow.mp3");
            yellow1.play();
            break;
    
        default:
            break;
    }
 }


//animates the current color that is pressed or chosen by nextSequence through the parameter currentColor
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)

}


//checks to see id the last item of the user array matches with the last of the games array if it does it calls nextSequence if it doesnt it calls startOver
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");;
          }, 200);
        var wrong1 = new Audio("/sounds/wrong.mp3");
        wrong1.play();
        $("h1").html("Game Over, Press Any Key to Restart.");
        if (highscore < level) {
            highscore = level;
            $(".highscore").html("Highscore " + highscore);
        }
        startOver();
    }
}

//resets all of the var's the level, the last pattern and the startGame
function startOver() {
    level = 0;
    gamePattern = [];
    startGame = 0;
}

// EVENT LISTENERS //

//listens for a key press and if startGame is 0 its starts the game if not it ignores it
$(document).on("keydown", function (e) {
    if(startGame === 0) {
        $("h1").html("Level 0");
        nextSequence();
        startGame = 1;
    }
});

//if a button is clicked is checks its id and pushes that id onto the users array
$(".btn").on("click", function (e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});
