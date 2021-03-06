/* globals game */

let loadState = {
  preload () {
    game.load.path = 'assets/images/'
    // Mario sprite
    game.load.spritesheet('mario', 'mario.png', 50, 83)
    // torch sprite
    game.load.spritesheet('torch', 'torch.png', 32, 64)
    game.load.images([
      'menu-background', 'first-level-background', 'second-level-background',
      'floor', 'question', 'dragon', 'door-block', 'lock', 'lock-screen', 'book',
      'controls', 'controls-lvl2', 'open-book', 'tube', 'door', 'princess-block',
      'win'
    ])

    game.load.path = 'assets/audio/'
    game.load.audio('shoot', ['shotgun.mp3', 'shotgun.ogg'])
    game.load.audio('menu', ['menu.mp3', 'menu.ogg'])
    game.load.audio('fart', ['fart.mp3', 'fart.ogg'])
    game.load.audio('fart-sorry', ['fart-sorry.mp3', 'fart-sorry.ogg'])
    game.load.audio('jump', ['jump.mp3', 'jump.ogg'])
    game.load.audio('jump-high', ['jump-high.mp3', 'jump-high.ogg'])
    game.load.audio('step', ['step.mp3', 'step.ogg'])
    game.load.audio('kill-dragon', ['kill-dragon.mp3', 'kill-dragon.ogg'])
    game.load.audio('another-castle', ['another-castle.mp3', 'another-castle.ogg'])
    game.load.audio('mario-last-words', ['mario-last-words.mp3', 'mario-last-words.ogg'])
    game.load.audio('die', ['die.mp3', 'die.ogg'])
  },

  create () {
    game.state.remove('boot')
    game.state.start('menu')
  }
}
