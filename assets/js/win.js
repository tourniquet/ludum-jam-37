/* globals game */

let winState = {
  create () {
    game.state.remove('secondLevel')

    this.background = game.add.sprite(0, 0, 'win')

    this.winSoundtrack = game.add.audio('die')
    this.winSoundtrack.volume = 0.5
    this.winSoundtrack.play()
  }
}
