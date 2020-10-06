
var level = 0;

// array to store colors user clicked
var userClickedPattern = [];

// array to store colors randomly selected
var gamePattern = [];

// array with colors
buttonColours = ["red", "blue", "green", "yellow"];





// keep track of the keypress, if keypress length = 1 then get random button, animate random button and play its sound
gameStarted = false;
$("body").keypress(function() {
  if(!gameStarted) {
    $("body").removeClass("gameover");
    nextSequence();
    gameStarted = true;
  }
});



// playsound when button is clicked
counter = 0;
$(".btn").click(function() {

  //I think the two lines below should be inside first if
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  if (gameStarted === true) {
    if(userClickedPattern[counter] === gamePattern[counter] && counter < level) {
    playSound(this.id);
    animatePress("#" + this.id);
    counter++;
      if (counter == level) {
      nextSequence();
      counter = 0;
      userClickedPattern = [];
      }
    }

    else {
      $("h1").text("Game Over - Press A key to try again");
      $("body").addClass("gameover");
      var gameoverSound = new Audio("sounds/wrong.mp3");
      gameoverSound.play();
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
    }
  }, 1500)
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
