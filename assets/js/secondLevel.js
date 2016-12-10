let secondLevel = {
  create () {
    game.add.image(0, 0, 'first-level-background')

    let fTorch = game.add.sprite(110, 85, 'torch')
    let animatedTorch = fTorch.animations.add('animatedTorch')
    fTorch.animations.play('animatedTorch', 10, true)

    let sTorch = game.add.sprite(310, 85, 'torch')
    let sAnimatedTorch = sTorch.animations.add('sAnimatedTorch')
    sTorch.animations.play('sAnimatedTorch', 10, true)

    let tTorch = game.add.sprite(55, 230, 'torch')
    let tAnimatedTorch = tTorch.animations.add('tAnimatedTorch')
    tTorch.animations.play('tAnimatedTorch', 10, true)

    let fourthTorch = game.add.sprite(260, 230, 'torch')
    let fourthAnimatedTorch = fourthTorch.animations.add('fourthAnimatedTorch')
    fourthTorch.animations.play('fourthAnimatedTorch', 10, true)
  }
}
