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
const CHARACTER_WIDTH = 20;
const CHARACTER_HEIGHT = 20;
const VELOCITY = 2.5;

// Movement Related
let goLeft = false;
let goUp = false;
let goRight = false;
let goDown = false;
let keyLeft = 65;
let KeyUp = 87;
let KeyRight = 68;
let KeyDown = 83;

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

// Handling Key Down
const handleKeyDown = (e) => {
  //if(e.keyCode == 65 ){
  //console.log('left')
  //}else if(e.keyCode == 87 ){
  //console.log('up')
  //}else if(e.keyCode == 68 ){
  //console.log('right')
  //}else if(e.keyCode == 83){
  //console.log('down')}
  setMapMovement(true, e.keyCode);
  //console.log(goUp,goDown,goLeft,goRight)
};

// Handling Key Up
const handleKeyUp = (e) => {
  setMapMovement(false, e.keyCode);
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

//update the movement of everything
const updateMovements = () => {
  moveMap();
  updateMap();

};

//Start game and check key press
const startGame = () => {
  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp);
  setInterval(updateMovements, LOOP_INTERVAL);
};

let CenterX = GAME_HEIGHT / 2 - CHARACTER_HEIGHT / 2;
let CenterY = GAME_WIDTH / 2 - CHARACTER_WIDTH / 2;
let randomX = null;
let randomY = null;

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateRandom = () => {
  let randomX
  let randomY
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

  return { randomX, randomY }
};


const p1Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_HEIGHT,
  },
  initVelocity: VELOCITY,
  initBackground: "blue",
};

function Game({ id, LOOP_INTERVAL }) {
  const game = {
    $elem: $(id),
    id,
    loop: null,
    characters: [],
  };

  this.addCharacter = (setting) => {
    game.characters.push(new Character(setting));
  };
}

//Character
function Character({
  initDimension,
  initVelocity,
  initBackground,
}) {
  const { randomX, randomY } = generateRandom()
  const character = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    velocity: initVelocity,
    position: { x: CenterX - randomX, y: CenterY - randomY },
    background: initBackground,
  };

  // Create character and appends the character to game-screen
  const init = () => {
    const {
      id,
      position: { x, y },
      dimension: { w, h },
      background,
    } = character;
    character.$elem = $(`<div id="${id}"></div>`)
      .css("left", x)
      .css("top", y)
      .css("background", background)
      .css("width", w)
      .css("height", h)
      .css("position", "absolute")
      .appendTo("#game-screen");
  };

  init();
}

const game = new Game(gameSettings);
console.log('stored', randomX, randomY);
game.addCharacter(p1Settings);
console.log("finish P1 setting");
startGame();
console.log("game start");


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
