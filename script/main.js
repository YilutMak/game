// Game & Map Related
const $GameScreen = $("#game-screen");
const $GameMap = $("#game-map");
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
let xPosition = -875;
let yPosition = -875;
let mapHitLimitLeft = false;
let mapHitLimitRight = false;
let mapHitLimitTop = false;
let mapHitLimitBottom = false;
var gameaudio = new Audio('music/gamemusic.mp3');
var gunaudio = new Audio('music/gunshot.mp3');
var uhaudio = new Audio('music/uh.mp3');
var diedaudio = new Audio('music/died.mp3');
var clickdaudio = new Audio('music/click.mp3');

// Game Loop Related
const FPS = 60;
const LOOP_INTERVAL = Math.round(1000 / FPS);
const gameSettings = {
  id: "#game-screen",
  loopInterval: LOOP_INTERVAL,
};
let loop = null;
let seconds1 = 0;
let seconds2 = 0;
let minutes1 = 0;
let minutes2 = 0;
let gameTimeStart = false;
const $timer = $("#timer");
let timeCount = false

// Character Related
const ENEMY_WIDTH = 20;
const ENEMY_HEIGHT = 20;
const VELOCITY = 0.8;
let clientX, clientY;
let characterMovement = false
let frames = 1

// Enemy Related
let enemySpeed = 0.5;

// Bullet Related
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 4;
const BVELOCITY = 0.5;

// Movement Related
let goLeft = false;
let goUp = false;
let goRight = false;
let goDown = false;
let shoot = false;
let keyLeft = 65;
let KeyUp = 87;
let KeyRight = 68;
let KeyDown = 83;
let KeySpace = 32;
let travelY = 0;
let travelX = 0;

//zombies
let CenterX = GAME_HEIGHT / 2 - ENEMY_HEIGHT / 2;
let CenterY = GAME_WIDTH / 2 - ENEMY_WIDTH / 2;
let randomX = null;
let randomY = null;

const playerFrames = () =>{
    setTimeout(() => { $Player.attr("src","images/leon1.png") }, 200);
    $Player.attr("src","images/leon2.png")
}


//set character direction
const setMapMovement = (value, keyCode) => {
  if (keyCode === keyLeft) {
    goLeft = value;
  }
  if (keyCode === KeyUp) {
    goUp = value;
  }
  if (keyCode === KeyRight) {
    goRight = value;
  }
  if (keyCode === KeyDown) {
    goDown = value;
  }
  if (keyCode === KeySpace) {
    shoot = value;
  }
};

//Increasing map X,Y coordinates
const moveMap = () => {

  //console.log(travelX, travelY, mapHitLimitTop);
  if (goLeft) {
    if (travelY < 888) {
      yPosition += VELOCITY;
      travelY += VELOCITY;
    }
  }

  if (goRight) {
    if (travelY > -892) {
      yPosition -= VELOCITY;
      travelY -= VELOCITY;
    }
  }

  if (goUp) {
    if (travelX > -891) {
      xPosition += VELOCITY;
      travelX -= VELOCITY;
    }
  }

  if (goDown) {
    if (travelX < 890) {
      xPosition -= VELOCITY;
      travelX += VELOCITY;
    }
  }

  if (travelX < -891){
    mapHitLimitTop=true
  }else {
    mapHitLimitTop=false
  }

  if( travelX > 890) {
    mapHitLimitBottom=true
  }else {
    mapHitLimitBottom=false
  }


  if (travelY > 888) {
    mapHitLimitLeft=true
  }else {
    mapHitLimitLeft=false
  }

  if (travelY < -892) {
    mapHitLimitRight=true
  }else {
    mapHitLimitRight=false
  }


};

//updating map X,Y position
const updateMap = () => {

  if (characterMovement===true) {
    $GameMap.css({ top: xPosition, left: yPosition });
  }
};

//random integer generator
const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

//generate random position
const generateRandom = () => {
  let randomX;
  let randomY;
  switch (randomInt(4)) {
    case 0:
      randomX = randomInt(240);
      randomY = -240;
      //console.log("case1", randomX, randomY);
      break;
    case 1:
      randomX = randomInt(240);
      randomY = 240;
      //console.log("case2", randomX, randomY);
      break;
    case 2:
      randomX = -240;
      randomY = randomInt(240);
      //console.log("case3", randomX, randomY);
      break;
    case 3:
      randomX = 240;
      randomY = randomInt(240);
      //console.log("case4", randomX, randomY);
      break;
  }

  return { randomX, randomY };
};

//enemy profile
const p1Settings = {
  initDimension: {
    w: ENEMY_WIDTH,
    h: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITY,
  initBackground: "blue",
};

//Enemies
function Enemy({ initDimension, initVelocity, initBackground }) {
  const { randomX, randomY } = generateRandom();
  this.$elem = null;
  this.src = 'images/zombie1.png'
  this.id = `_${Math.random().toString(36).substring(2, 15)}`;
  this.dimension = initDimension;
  this.velocity = initVelocity;
  this.position = { x: CenterX - randomX, y: CenterY - randomY };
  this.background = initBackground;
  this.distance = null;

  // Create enemy and appends the enemy to game-screen
  const init = () => {
    const {
      id,
      position: { x, y },
      dimension: { w, h },
      background,
    } = this;
    this.$elem = $(`<div id="${id}"></div>`)
      .css("left", x)
      .css("top", y)
      .css("background", background)
      .css("width", w)
      .css("height", h)
      .css("position", "absolute")
      .appendTo("#game-screen");
  };

  init();

  this.moveEnemy = () => {
    const {
      position: { x, y },
    } = this;

    let newX = x;
    let newY = y;






    //zombie move towards player
    if (newX > 240) {
      newX -= enemySpeed;
    }
    if (newX < 240) {
      newX += enemySpeed;
    }
    if (newY > 240) {
      newY -= enemySpeed;
    }
    if (newY < 240) {
      newY += enemySpeed;
    }

    //console.log(mapHitLimit)

    //When player moves, the zombies are shifted too
    if (goLeft && mapHitLimitLeft === false ) {
      newX += VELOCITY;
    }
    if (goRight && mapHitLimitRight === false) {
      newX -= VELOCITY;
    }
    if (goUp && mapHitLimitTop === false) {
      newY += VELOCITY;
    }
    if (goDown && mapHitLimitBottom === false) {
      newY -= VELOCITY;
    }

    this.position.x = newX;
    this.position.y = newY;
    this.$elem.css("left", newX).css("top", newY);
  };
}

//creating bullets
function Bullet({ xVelocity, yVelocity }) {
  this.$elem = null;
  this.id = `_${Math.random().toString(36).substring(2, 15)}`;
  this.dimension = {
    w: BULLET_WIDTH,
    h: BULLET_HEIGHT,
  };
  this.xVelocity = BVELOCITY * xVelocity;
  this.yVelocity = BVELOCITY * yVelocity;
  this.position = { x: CenterX - randomX, y: CenterY - randomY };
  this.background = "yellow";

  // Create bullet and appends the bullet to game-screen
  const init = () => {
    const {
      id,
      position: { x, y },
      dimension: { w, h },
      background,
    } = this;
    this.$elem = $(`<div id="${id}"></div>`)
      .css("left", x)
      .css("top", y)
      .css("background", background)
      .css("width", w)
      .css("height", h)
      .css("position", "absolute")
      .appendTo("#game-screen");
  };

  init();

  this.moveBullet = () => {
    const {
      position: { x, y },
    } = this;

    let bulletX = x;
    let bulletY = y;

    // TODO Move bullet when character move
    bulletX += xVelocity;
    bulletY += yVelocity;

    if (goLeft) {
      bulletX += VELOCITY;
    }
    if (goRight) {
      bulletX -= VELOCITY;
    }
    if (goUp) {
      bulletY += VELOCITY;
    }
    if (goDown) {
      bulletY -= VELOCITY;
    }

    this.position.x = bulletX;
    this.position.y = bulletY;
    this.$elem.css("left", bulletX).css("top", bulletY);
  };
}

//running the Game
function Game({ id, LOOP_INTERVAL }) {
  this.$elem = $(id);
  this.id = id;
  this.loop = null;
  this.enemies = [];
  this.bullets = [];

  // Handling Key Down
  const handleKeyDown = (e) => {
    setMapMovement(true, e.keyCode);
    gameTimeStart = true;
    playerFrames()
  };

  // Handling Key Up
  const handleKeyUp = (e) => {
    setMapMovement(false, e.keyCode);
  };

  //update the movement of everything
  const updateMovements = () => {
    moveMap();
    updateMap();
    this.enemies.forEach((Enemy) => {
      Enemy.moveEnemy();
    });
    this.bullets.forEach((Bullet) => {
      Bullet.moveBullet();
    });
    hitBoxCheck();
  };

  //add enemy
  this.addEnemy = (setting) => {
    this.enemies.push(new Enemy(setting, this.$elem));
  };

  //add bullets
  this.addBullet = (setting) => {
    this.bullets.push(new Bullet(setting, this.$elem));
  };

  //Start game and check key press
  this.startGame = () => {
    $(document).on("keydown", handleKeyDown);
    $(document).on("keyup", handleKeyUp);
    //game.addEnemy(p1Settings);
    setInterval(updateMovements, LOOP_INTERVAL);
  };
}

$(document).on("mousemove", function (e) {
  clientX = e.clientX;
  clientY = e.clientY;
});

//shooting bullets towards your cursor
$(document).on("keypress", function (e) {
  if (shoot && e.keyCode === 32) {
    gunaudio.play();
    const { left, top } = $GameScreen[0].getBoundingClientRect();
    const mX = clientX - left;
    const mY = clientY - top;

    const dX = mX - 250;
    const dY = mY - 250;
    const l = Math.sqrt(dX * dX + dY * dY);

    game.addBullet({
      yVelocity: dY / l,
      xVelocity: dX / l,
    });
    shoot = false;
  }
});

//check hit box of enemies, bullets and player
const hitBoxCheck = () => {
  let enemyXPosition;
  let enemyYPosition;

  for (let i = 0; i < game.bullets.length; i++) {
    let bulletXPosition;
    let bulletYPosition;
    bulletXPosition = game.bullets[i].position.x;
    bulletYPosition = game.bullets[i].position.y;
    //console.log(bulletXPosition, bulletYPosition);
    if (
      bulletXPosition >= 500 ||
      bulletXPosition <= 0 ||
      bulletYPosition >= 500 ||
      bulletYPosition <= 0
    ) {
      //console.log("out of range");
      game.bullets[i].$elem.remove();
      game.bullets.splice(i, 1);
      i--;
    }
  }

  for (let u = 0; u < game.enemies.length; u++) {
    enemyXPosition = game.enemies[u].position.x;
    enemyYPosition = game.enemies[u].position.y;
    if (
      enemyXPosition >= 230 &&
      enemyXPosition <= 260 &&
      enemyYPosition >= 230 &&
      enemyYPosition <= 260
    ) {
      for (let u = 0; u < game.enemies.length; u++) {
        game.enemies[u].$elem.remove();
      }
      game.enemies.splice(u, game.enemies.length);
      //console.log('you lose');
      $GameOvertimer.text('Highscore: '+
      minutes2.toFixed(0) +
        minutes1.toFixed(0) +
        seconds2.toFixed(0) +
        seconds1.toFixed(0))
      $GameScreen.hide()
      diedaudio.play();
      resetGame()
    }
    for (let i = 0; i < game.bullets.length; i++) {
      let bulletXPosition;
      let bulletYPosition;
      bulletXPosition = game.bullets[i].position.x;
      bulletYPosition = game.bullets[i].position.y;
      if (
        bulletXPosition <= enemyXPosition + 20 &&
        bulletXPosition >= enemyXPosition &&
        bulletYPosition <= enemyYPosition + 20 &&
        bulletYPosition >= enemyYPosition
      ) {
        uhaudio.play();
        //console.log("hit");
        game.enemies[u].$elem.remove();
        game.enemies.splice(u, 1);
        u--;
        //console.log(game.enemies);
      }
    }
  }

  //console.log(enemyXPosition,enemyYPosition,bulletXPosition,bulletYPosition )
};

var zombieSpawn = 1;
let zombieCount = 0;






const timerStart = () => {
if(timeCount === true){
seconds1 += 1;
    if (seconds1 > 9) {
      seconds1 = 0;
      seconds2 += 1;
    }
    if (seconds2 > 5) {
      seconds2 = 0;
      minutes1 += 1;
    }
    $timer.text(
      minutes2.toFixed(0) +
        minutes1.toFixed(0) +
        ":" +
        seconds2.toFixed(0) +
        seconds1.toFixed(0)
    );

    //when timer hits 5 seconds spawn new set of zombies
    if (seconds1 === 4 || 8) {
      zombieCount += zombieSpawn;
      //console.log(zombieSpawn)
    }
    if (zombieCount > 0) {
      game.addEnemy(p1Settings);
      zombieSpawn += 1;
      zombieCount--;
    }
}
}


function timeStop() {
  clearInterval(timerStart);
}


//timer start when game starts



const game = new Game(gameSettings);


const $startButton = $("#startbutton");
const $StartScreen = $("#game-start");
const $GameOverScreen = $("#game-over")
const $GameOvertimer = $("#gameovertimer")
const $Retry = $("#tryagain")
const $Player = $("#player")


$startButton.on("click", $startButton, function (e) {
  game.startGame();
  $GameScreen.show()
  $StartScreen.hide()
  $GameOverScreen.hide()
  timeCount = true
  characterMovement = true
  gameaudio.play();
});


$Retry.on("click", $Retry, function (e) {
  $GameOverScreen.hide()
  $StartScreen.show()

});

const timeInterval = setInterval(timerStart, 1000);

const resetGame = () => {
  gameaudio.pause();
  $GameOverScreen.show()
  clearInterval(timeInterval)
  characterMovement = false
  timeCount = false
  zombieCount=0
  zombieSpawn=0
  seconds1 = 0
  seconds2 = 0
  minutes1 = 0
  minutes2 = 0
  xPosition = -875;
  yPosition = -875;
}

$GameOverScreen.hide()

//Level 1:
//Add game start screen
//  show instructions

//Add game over screen
//  Add score

//Add sprites

//Level 2:
//Add lvl up
//Add upgrades
//Add drops
