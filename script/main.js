// Game & Map Related
const $GameScreen = $("#game-screen");
const $GameMap = $("#game-map");
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
let xPosition = -875;
let yPosition = -875;

// Game Loop Related
const FPS = 60;
const LOOP_INTERVAL = Math.round(1000 / FPS);
const gameSettings = {
  id: "#game-screen",
  loopInterval: LOOP_INTERVAL,
};
let loop = null;

// Character Related
const ENEMY_WIDTH = 20;
const ENEMY_HEIGHT = 20;
const VELOCITY = 1;

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
let shoot = false
let keyLeft = 65;
let KeyUp = 87;
let KeyRight = 68;
let KeyDown = 83;
let KeySpace = 32;
let travelY = 0
let travelX = 0

//zombies
let CenterX = GAME_HEIGHT / 2 - ENEMY_HEIGHT / 2;
let CenterY = GAME_WIDTH / 2 - ENEMY_WIDTH / 2;
let randomX = null;
let randomY = null;

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

//Moving the map
const moveMap = () => {

  if (goLeft) {
    if(travelY < 888){
    yPosition += VELOCITY
    travelY += VELOCITY
    }


  }
  if (goRight) {
    if(travelY > -892){
    yPosition -= VELOCITY;
    travelY -= VELOCITY
    }
  }

  if (goUp) {
    if(travelX > -891){
    xPosition += VELOCITY;
    travelX -= VELOCITY
    }
  }

  if (goDown) {
    if(travelX < 890){
    xPosition -= VELOCITY;
    travelX += VELOCITY
    }
  }
};

const updateMap = () => {
  $GameMap.offset({ top: xPosition, left: yPosition });
};

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

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

    //when zombie touches player, lose
    if (newX <= 257 && newX >= 223) {
      if (newY <= 250 && newY >= 230) {
        //console.log('loser')
      }
    }

    //When player moves, the zombies are shifted too
    if (goLeft) {
      newX += VELOCITY;
    }
    if (goRight) {
      newX -= VELOCITY;
    }
    if (goUp) {
      newY += VELOCITY;
    }
    if (goDown) {
      newY -= VELOCITY;
    }

    this.position.x = newX;
    this.position.y = newY;
    this.$elem.css("left", newX).css("top", newY);
  };
}

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

    bulletX += xVelocity;
    bulletY += yVelocity;

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
    setInterval(updateMovements, LOOP_INTERVAL);
  };
}

const game = new Game(gameSettings);
game.addEnemy(p1Settings);
game.addEnemy(p1Settings);
game.startGame();

$GameScreen.on("mousemove", function (e) {

  if(shoot){
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const mX = clientX - left;
    const mY = clientY - top;

    const dX = mX - 250
    const dY = mY - 250
    const l = Math.sqrt(dX * dX + dY * dY)

    game.addBullet({
      yVelocity: dY / l,
      xVelocity: dX / l,
    });
    shoot = false
  }
});





//Level 1:
//Generate random zombies (loop)
//  gradually spawn more as time increase

//Add hit box for zombies
//  If zombie touches player, game is over

//  zombie disappears if hit by gun

//Add game start screen
//  show instructions

//Add game over screen
//  Add score

//Add sprites

//Level 2:
//Add lvl up
//Add upgrades
//Add drops
