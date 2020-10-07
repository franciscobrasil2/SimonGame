
var level = 0;

// array to store colors user clicked
var userClickedPattern = [];

// array to store colors randomly selected
var gamePattern = [];

// array with colors
buttonColours = ["red", "blue", "green", "yellow"];

var myLoopRunning = false;



// keep track of the keypress, if keypress length = 1 then get random button, animate random button and play its sound
var gameStarted = false;
$(".startbutton").click(function() {
  if(!gameStarted) {
    $("body").removeClass("gameover");
    nextSequence();
    gameStarted = true;
    $(".startbutton").css("display", "none");
  }
});



// playsound when button is clicked

var counter = 0;
$(".btn").click(function() {
  if (gameStarted && !myLoopRunning) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    if(userClickedPattern[counter] === gamePattern[counter] && counter < level) {
    playSound(this.id);
    animatePress("#" + this.id);
    counter++;
      if (counter == level) {
        myLoopRunning = true;
        setTimeout(function() {
          $("body").addClass("bodyNextLevel");
          $("h1").text("Good Job - Next Level");
          playSound("levelup");
          setTimeout(function() {
            $("body").removeClass("bodyNextLevel");
            nextSequence();
          }, 2000);
        }, 700);
       counter = 0;
       userClickedPattern = [];
      }
    }

    else {
      $("h1").text("Game Over - Press the button to try again");
      $("body").addClass("gameover");
      playSound("wrong");
      $(".startbutton").css("display", "inline-block");
      $(".startbutton").text("Try Again");
      gameStarted = false;
      level = 0;
      counter = 0;
      userClickedPattern = [];
      gamePattern = [];
    }
  }
});


// creates and returns a random number
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  $("h1").text("Level " + level);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  myLoop(gamePattern);
};

//delaied for loop to playSound and animatePress

var myloopCount = 0;
function myLoop(functionInput) {

  setTimeout(function() {
    playSound(gamePattern[myloopCount]);
    animatePress("#" + gamePattern[myloopCount]);
    myloopCount++;
    if(myloopCount < gamePattern.length) {
      myLoop();
    }
    else {
      myloopCount = 0;
      myLoopRunning = false;
    }
  }, 900)
};

// function Play Sound
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
};

// add class pressed to object
function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {$(currentColour).removeClass("pressed")}, 100);
};
