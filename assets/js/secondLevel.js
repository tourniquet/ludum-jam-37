/* globals game, Phaser */

let secondLevel = {
  create () {
    game.add.image(0, 0, 'second-level-background')

    // level sounds
    this.shoot = game.add.audio('shoot')
    this.shoot.volume = 0.5
    // step
    this.step = game.add.audio('step')

    // enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // invisible floor
    this.floor = game.add.sprite(0, 235, 'floor')
    game.physics.arcade.enable(this.floor)
    this.floor.body.enable = true
    this.floor.body.immovable = true
    // insibisle door block
    this.doorBlock = game.add.sprite(400, 120, 'door-block')
    game.physics.arcade.enable(this.doorBlock)
    this.doorBlock.body.enable = true
    this.doorBlock.body.immovable = true

    this.lock = game.add.sprite(438, 190, 'lock')
    this.lock.inputEnabled = true
    this.lock.input.useHandCursor = true
    this.lock.events.onInputUp.add(this.showScreen, this)

    // text bitmap
    this.bitmapText = game.make.bitmapData(800, 400)
    this.bitmapText.context.font = ''

    // mario
    this.mario = game.add.sprite(100, 235, 'mario')
    game.physics.arcade.enable(this.mario)
    this.mario.anchor.setTo(0, 1)
    this.mario.body.enable = true
    this.mario.body.bounce.y = 0.1
    this.mario.body.gravity.y = 800
    this.mario.body.collideWorldBounds = true
    this.mario.animations.add('left', [0, 1, 2], 8, false)
    this.mario.animations.add('right', [7, 6, 5], 8, false)
    // Mario body direction when animation is stopped
    this.marioDirection = 'right'

    let fTorch = game.add.sprite(110, 85, 'torch')
    fTorch.animations.add('animatedTorch')
    fTorch.animations.play('animatedTorch', 10, true)

    let sTorch = game.add.sprite(310, 85, 'torch')
    sTorch.animations.add('sAnimatedTorch')
    sTorch.animations.play('sAnimatedTorch', 10, true)

    let tTorch = game.add.sprite(55, 230, 'torch')
    tTorch.animations.add('tAnimatedTorch')
    tTorch.animations.play('tAnimatedTorch', 10, true)

    let fourthTorch = game.add.sprite(260, 230, 'torch')
    fourthTorch.animations.add('fourthAnimatedTorch')
    fourthTorch.animations.play('fourthAnimatedTorch', 10, true)

    this.cursors = game.input.keyboard.createCursorKeys()
    this.shootButton = Phaser.Keyboard.CONTROL
    this.jumpButton = Phaser.Keyboard.SPACE
    this.enableLock = Phaser.Keyboard.E
  },

  update () {
    game.physics.arcade.collide(this.mario, this.floor)
    game.physics.arcade.collide(this.mario, this.doorBlock)

    if (game.input.keyboard.isDown(this.enableLock)) this.enableLockFunc()

    this.movePlayer()
  },

  movePlayer () {
    if (this.cursors.left.isDown) {
      this.mario.body.velocity.x = -200
      this.mario.animations.play('left')
      this.marioDirection = 'left'
      this.stepSound()
    } else if (this.cursors.right.isDown) {
      this.mario.body.velocity.x = 200
      this.mario.animations.play('right')
      this.marioDirection = 'right'
      this.stepSound()
    } else {
      this.mario.body.velocity.x = 0
      this.mario.animations.stop()

      if (this.marioDirection === 'left') {
        this.mario.frame = 3
      } else {
        this.mario.frame = 4
      }
    }

    if (game.input.keyboard.isDown(this.shootButton)) {
      if (!this.eventOnce) {
        if (this.marioDirection === 'right') {
          game.add.tween(this.mario).to({ x: [this.mario.x - 10, this.mario.x] }, 200, Phaser.Easing.Linear.None, true)
        } else {
          game.add.tween(this.mario).to({ x: [this.mario.x + 10, this.mario.x] }, 200, Phaser.Easing.Linear.None, true)
        }
        this.shoot.play()
        this.eventOnce = true
      }
    } else {
      this.eventOnce = false
    }
  },

  stepSound () {
    if (this.mario.body.touching.down) {
      this.step.play()
    }
  },

  enableLockFunc () {
    console.log('Hello, world!')
  },

  insertCode () {
    let code = '13985'

  },

  showScreen () {
    let screen = game.add.sprite(400, 200, 'lock-screen')
    screen.anchor.setTo(0.5, 0.5)
    screen.inputEnabled = true
    screen.input.useHandCursor = true
    screen.events.onInputUp.add(spriteDestroy, this)

    function spriteDestroy (sprite) {
      sprite.destroy()
    }
  }
}
