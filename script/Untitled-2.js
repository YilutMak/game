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

  const game = new Game(gameSettings)
  game.startGame()


//Game Start
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

    }

    this.startGame = () => {
      $(document).on('keydown', handleKeyDown)
      $(document).on('keyup', handleKeyUp)

      game.loop = setInterval(updateMovements, loopInterval)
    }
  }
