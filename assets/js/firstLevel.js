/* globals game, Phaser */

let firstLevel = {
  create () {
    game.add.image(0, 0, 'first-level-background')

    // level sounds
    this.shoot = game.add.audio('shoot')
    this.shoot.volume = 0.5
    // fart when user start playing
    this.fartOnce = true
    this.fart = game.add.audio('fart')
    this.fart.volume = 1
    // fart sorry
    this.fartSorry = game.add.audio('fart-sorry')
    this.fart.volume = 0.5
    // jump sound
    this.jump = game.add.audio('jump')
    this.jump.volume = 1
    // can't jump so high
    this.noJumpHigh = game.add.audio('jump-high')
    this.noJumpHigh.volume = 0.5
    this.noJumpHighPlayOnce = 0
    // step
    this.step = game.add.audio('step')
    // kill dragon voice message
    this.killDragonAudioMessage = game.add.audio('kill-dragon')
    this.killDragonAudioMessageOnce = 1
    this.killDragonShootCounter = 100000
    this.shootDragonTexMessage = game.add.text(
      600, 210, '',
      { font: '24px Arial', fill: '#fff' }
    )

    // enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // question box
    let fQuestionBox = game.add.sprite(200, 100, 'question')
    let sQuestionBox = game.add.sprite(400, 100, 'question')
    // controls
    let controls = game.add.sprite(0, 0, 'controls')

    // invisible floor
    this.floor = game.add.sprite(0, 325, 'floor')
    game.physics.arcade.enable(this.floor)
    this.floor.body.enable = true
    this.floor.body.immovable = true

    // block access to dragon
    this.blockDragon = game.add.sprite(600, 180, 'door-block')
    game.physics.arcade.enable(this.blockDragon)
    this.blockDragon.body.enable = true
    this.blockDragon.body.immovable = true

    // mario
    this.mario = game.add.sprite(100, 325, 'mario')
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

    // dragon
    this.dragon = game.add.sprite(650, 325, 'dragon')
    this.dragon.anchor.setTo(0, 1)

    // torches
    let fTorch = game.add.sprite(0, 305, 'torch')
    fTorch.animations.add('animatedTorch')
    fTorch.animations.play('animatedTorch', 10, true)
    let sTorch = game.add.sprite(370, 305, 'torch')
    sTorch.animations.add('sAnimatedTorch')
    sTorch.animations.play('sAnimatedTorch', 10, true)
    let tTorch = game.add.sprite(770, 305, 'torch')
    tTorch.animations.add('tAnimatedTorch')
    tTorch.animations.play('tAnimatedTorch', 10, true)

    this.cursors = game.input.keyboard.createCursorKeys()
    this.shootButton = Phaser.Keyboard.CONTROL
    this.jumpButton = Phaser.Keyboard.SPACE

    // call event only once when key is pressed
    this.eventOnce = false
  },

  update () {
    game.physics.arcade.collide(this.mario, this.floor)
    game.physics.arcade.collide(this.mario, this.blockDragon, this.killDragonMessage, null, this)

    this.movePlayer()

    if (this.killDragonShootCounter === 0) {
      this.deadDragonFunc()
    }
  },

  movePlayer () {
    if (this.cursors.left.isDown) {
      this.mario.body.velocity.x = -200
      this.mario.animations.play('left')
      this.marioDirection = 'left'
      this.fartOnceFunc()
      this.stepSound()
    } else if (this.cursors.right.isDown) {
      this.mario.body.velocity.x = 200
      this.mario.animations.play('right')
      this.marioDirection = 'right'
      this.fartOnceFunc()
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
        this.killDragonShootCounter --
      }
    } else {
      this.eventOnce = false
    }

    if (this.cursors.up.isDown && this.mario.body.touching.down) {
      this.mario.body.velocity.y = -300
      this.jump.play()

      this.noJumpHighPlayOnce++
      if (this.noJumpHighPlayOnce % 3 === 0) {
        this.noJumpHigh.play()
      }
    }
  },

  fartOnceFunc () {
    // fart only once
    if (this.fartOnce) {
      this.fart.play()
      this.fartOnce = false
      this.fartSorryFunc()
    }
  },

  fartSorryFunc () {
    setTimeout(() => {
      // this.fartSorry.play()
    }, 400)
  },

  stepSound () {
    if (this.mario.body.touching.down) {
      this.step.play()
    }
  },

  killDragonMessage () {
    if (this.killDragonAudioMessageOnce === 1) {
      this.killDragonAudioMessage.play()
      this.killDragonAudioMessageOnce--

      setTimeout(() => {
        this.shootDragonTexMessage.text = 'Shoot the dragon'
      }, 1200)
    }

    this.killDragonShootCounter = 3
  },

  deadDragonFunc () {
    this.killDragonShootCounter--
    this.blockDragon.body = false
    game.add.tween(this.dragon).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false)
    this.shootDragonTexMessage.text = ''

    // dragon book
    let book = game.add.sprite(660, 260, 'book')
    book.alpha = 0
    game.add.tween(book).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false)
  },

  showQuestions () {
    let openBook = game.add.sprite(400, 200, 'open-book')
  }
}
