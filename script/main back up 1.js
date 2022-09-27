//Main
  const GAME_WIDTH = 500
  const GAME_HEIGHT = 500
  const CHARACTER_WIDTH = 50
  const CHARACTER_HEIGHT = 50
  const VELOCITY = 2.5
  const FPS = 60
  const LOOP_INTERVAL = Math.round(1000 / FPS)

  const gameSettings = ({
    id: '#game-screen',
    loopInterval: LOOP_INTERVAL
  })

  const p1Settings = {
    initDimension: {
      w: CHARACTER_WIDTH,
      h: CHARACTER_HEIGHT
    },
    initVelocity: VELOCITY,
    initPos: { x: GAME_WIDTH - 275, y: GAME_HEIGHT - 275},
    initBackground: 'red',
    movementKeys: {
      left: 65,
      up: 87,
      right: 68,
      down: 83
    }
  }


  const game = new Game(gameSettings)
  game.addCharacter(p1Settings)
  game.startGame()



//game
  function Game({ id, loopInterval }) {
    const game = {
      $elem: $(id),
      id,
      loop: null,
      characters: []
    }

    // Handling Key Down
    const handleKeyDown = (e) => {
      game.characters.forEach((character) => {
        character.setCharacterMovement(true, e.keyCode)
      })
    }

    // Handling Key Up
    const handleKeyUp = (e) => {
      game.characters.forEach((character) => {
        character.setCharacterMovement(false, e.keyCode)
      })
    }

    const updateMovements = () => {
      game.characters.forEach((character) => {
        character.moveCharacter()
      })
    }

    this.addCharacter = (setting) => {
      game.characters.push(new Character(setting))
    }

    this.startGame = () => {
      $(document).on('keydown', handleKeyDown)
      $(document).on('keyup', handleKeyUp)

      game.loop = setInterval(updateMovements, loopInterval)
    }
  }


//Character
  function Character({ initDimension, initVelocity, initPos, initBackground, movementKeys }) {
  const character = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    background: initBackground,
    movementKeys,
    movement: {
      left: false,
      up: false,
      right: false,
      down: false
    }
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { x, y }, dimension: { w, h }, background } = character
    character.$elem = $(`<div id="${id}"></div>`)
      .css('left', x)
      .css('top', y)
      .css('background', background)
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .appendTo('#game-screen')
  }

  init()

  // Toggle which direction the character is moving to
  this.setCharacterMovement = (value, keyCode) => {
    const { movementKeys: { left, up, right, down } } = character
    switch (keyCode) {
      case left:
        character.movement.left = value
        break
      case up:
        character.movement.up = value
        break
      case right:
        character.movement.right = value
        break
      case down:
        character.movement.down = value
        break
    }
  }

  // Moving character
  this.moveCharacter = () => {
    const { velocity, position: { x, y }, movement: { left, up, right, down } } = character
    let newX = x
    let newY = y

    if (left) newX -= velocity
    if (up) newY -= velocity
    if (right) newX += velocity
    if (down) newY += velocity

    character.position.x = newX
    character.position.y = newY
    character.$elem.css('left', newX).css('top', newY)
  }
}
