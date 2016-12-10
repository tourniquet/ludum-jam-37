/* globals Phaser, bootState, loadState, menuState, firstLevel, secondLevel, winState */

let game = new Phaser.Game(800, 400, Phaser.AUTO)

game.state.add('boot', bootState)
game.state.add('load', loadState)
game.state.add('menu', menuState)
game.state.add('firstLevel', firstLevel)
game.state.add('secondLevel', secondLevel)
game.state.add('win', winState)

game.state.start('boot')
