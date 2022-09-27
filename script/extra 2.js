    let enemyX = game.enemies[0].position.x
    let enemyY = game.enemies[0].position.y

    if(bulletX > enemyX) {
      bulletX -= this.velocity
    }
    if(bulletX < enemyX) {
      bulletX += this.velocity
    }
    if(bulletY > enemyY) {
      bulletY -= this.velocity
    }
    if(bulletY < enemyY) {
      bulletY += this.velocity
    }











    const RADIAN = Math.PI / 180

$GameScreen.on("click", function (e) {
  const { clientX, clientY, currentTarget } = e;
  const { left, top } = currentTarget.getBoundingClientRect();
  const mX = clientX - left;
  const mY = clientY - top;

  const rot = Math.atan2(250 - mX, -250 + mY) / (RADIAN + 90)
  const xVelocity = 2.5 * Math.cos(RADIAN * rot)
  const yVelocity = 2.5 * Math.sin(RADIAN * rot)

  console.log(xVelocity, yVelocity)




  const xDirection = mX <= 250 ? -1 : 1;
  const yDirection = mY <= 250 ? -1 : 1;

  const xDiff = ((mX - 250) / 250)
  const yDiff = ((mY - 250) / 250)

  console.log(yDiff /)
