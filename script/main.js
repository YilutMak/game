// Game & Map Related
const $GameScreen = $("#game-screen");
const $GameMap = $("#game-map");
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
let xPosition = 0;
let yPosition = -250;

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
let enemySpeed = 0.5

// Movement Related
let goLeft = false;
let goUp = false;
let goRight = false;
let goDown = false;
let keyLeft = 65;
let KeyUp = 87;
let KeyRight = 68;
let KeyDown = 83;

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
};

//Moving the map
const moveMap = () => {
  if (goLeft) {
    yPosition += VELOCITY;
  }
  if (goRight) {
    yPosition -= VELOCITY;
  }

  if (goUp) {
    xPosition += VELOCITY;
  }

  if (goDown) {
    xPosition -= VELOCITY;
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
      console.log("case1", randomX, randomY);
      break;
    case 1:
      randomX = randomInt(240);
      randomY = 240;
      console.log("case2", randomX, randomY);
      break;
    case 2:
      randomX = -240;
      randomY = randomInt(240);
      console.log("case3", randomX, randomY);
      break;
    case 3:
      randomX = 240;
      randomY = randomInt(240);
      console.log("case4", randomX, randomY);
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
  this.$elem = null
  this.id = `_${Math.random().toString(36).substring(2, 15)}`
  this.dimension = initDimension
  this.velocity = initVelocity
  this.position = { x: CenterX - randomX, y: CenterY - randomY }
  this.background = initBackground

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
    } = this

    let newX = x
    let newY = y

    console.log(newX , newY)

    if(newX > 240) {
      newX -= enemySpeed
    }
    if(newX < 240) {
      newX += enemySpeed
    }
    if(newY > 240) {
      newY -= enemySpeed
    }
    if(newY < 240) {
      newY += enemySpeed
    }


    if(goLeft){
      newX += VELOCITY
    }
    if(goRight){
      newX -= VELOCITY
    }
    if(goUp){
      newY += VELOCITY
    }
    if(goDown){
      newY -= VELOCITY
    }

    this.position.x = newX
    this.position.y = newY
    this.$elem.css('left', newX).css('top', newY)
  }
}

//running the Game
function Game({ id, LOOP_INTERVAL }) {
  this.$elem = $(id)
  this.id = id
  this.loop = null
  this.enemies = []

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
    moveMap()
    updateMap()
    this.enemies.forEach((Enemy) => {
      Enemy.moveEnemy()
    });
  };

  //add enemy
  this.addEnemy = (setting) => {
    this.enemies.push(new Enemy(setting, this.$elem));
  };

  //Start game and check key press
  this.startGame = () => {
    $(document).on("keydown", handleKeyDown);
    $(document).on("keyup", handleKeyUp);
    setInterval(updateMovements, LOOP_INTERVAL);
  };
}

const game = new Game(gameSettings)
game.addEnemy(p1Settings)
game.startGame()
















//Level 1:
//Have zombies walk towards player
//  zombies need to adjust according to map

//Generate random zombies (loop)
//  gradually spawn more as time increase

//Add player boundaries

//Add hit box for zombies
//  If zombie touches player, game is over

//Add gun for player
//  automatically shoots at closest zombie
//  zombie disappears if hit

//Add game start screen
//  show instructions

//Add game over screen
//  Add score

//Add sprites

//Level 2:
//Add lvl up
//Add upgrades
//Add drops
