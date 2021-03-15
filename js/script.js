var gamePattern = []; 
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var started = false; 
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        wrongAnimate();
        wrongScene();
        startOver();
    }
}

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function wrongScene(){
    $("h1").text("Game Over, Press Any Key to Restart 😝 ");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
}

function wrongAnimate(){
    $("#main-body").addClass("game-over");
    setTimeout(function(){
    $("#main-body").removeClass("game-over");
    },200);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    },100);
}