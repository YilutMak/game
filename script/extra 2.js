  this.moveCharacter = () => {
    const {
      velocity,
      position: { x, y },
      movement: { goLeft, goUp, goRight, goDown }
    } = character

    let newX = x
    let newY = y

    if (left) {
      newX = x - velocity < 0 ? 0 : newX - velocity
    }
    if (up) {
      newY = y - velocity < 0 ? 0 : newY - velocity
    }
    if (right) {
      newX = x + w + velocity > gameW ? gameW - w : newX + velocity
    }
    if (down) {
      newY = y + h + velocity > gameH ? gameH - h : newY + velocity
    }

    character.position.x = newX
    character.position.y = newY
    character.$elem.css('left', newX).css('top', newY)
  }












      if (left) {
      newX = x - velocity < 0 ? 0 : newX - velocity
    }
    if (up) {
      newY = y - velocity < 0 ? 0 : newY - velocity
    }
    if (right) {
      newX = x + w + velocity > gameW ? gameW - w : newX + velocity
    }
    if (down) {
      newY = y + h + velocity > gameH ? gameH - h : newY + velocity
    }
