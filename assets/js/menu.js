/* globals game, Phaser */

let menuState = {
  create () {
    game.add.image(0, 0, 'menu-background')

    game.state.remove('load')

    this.menuMusic = game.add.audio('menu')
    this.menuMusic.volume = 0.5
    this.menuMusic.play()

    // create Phaser keyboard hotkey
    let enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    // start game on press enter
    enterKey.onDown.addOnce(startGame, this)
  }
}

function startGame () {
  this.menuMusic.stop()
  game.state.start('firstLevel')
}
