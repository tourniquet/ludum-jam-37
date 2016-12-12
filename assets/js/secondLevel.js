/* globals game, Phaser */

let secondLevel = {
  create () {
    game.add.image(0, 0, 'second-level-background')

    game.state.remove('firstLevel')

    // controls
    game.add.image(0, 0, 'controls-lvl2')

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
    this.doorBlock = game.add.sprite(400, 120, 'door')
    game.physics.arcade.enable(this.doorBlock)
    this.doorBlock.body.enable = true
    this.doorBlock.body.immovable = true

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

    // lock
    this.lock = game.add.sprite(438, 190, 'lock')
    this.lock.inputEnabled = true
    this.lock.input.useHandCursor = true
    this.lock.events.onInputUp.add(this.showScreen, this)
    // lock screen
    this.screen = game.add.sprite(-400, 200, 'lock-screen')
    this.screen.anchor.setTo(0.5, 0.5)
    this.screen.inputEnabled = true
    this.screen.input.useHandCursor = true
    this.screen.events.onInputUp.add(this.spriteDestroy, this)
    this.lockIsEnable = false

    // lock code
    this.userCode = game.add.text(
      350, 153, '',
      { font: '30px SuperMario256', fill: '#d0d0d0' }
    )
    this.codeArr = []
    this.code = '13985'

    // open book
    this.openBook = game.add.sprite(-300, 200, 'open-book')
    this.openBook.anchor.setTo(0.5, 0.5)
    this.openBook.inputEnabled = true
    this.openBook.input.useHandCursor = true
    this.openBook.events.onInputUp.add(this.closeQuestionsBook, this)
    // this.openBookIsOpen = false

    this.cursors = game.input.keyboard.createCursorKeys()
    this.shootButton = Phaser.Keyboard.CONTROL
    this.jumpButton = Phaser.Keyboard.SPACE
    this.openBookButton = Phaser.Keyboard.B
    this.openLockButton = Phaser.Keyboard.L
    // Capture all key presses
    game.input.keyboard.addCallbacks(this, null, null, this.insertCode)

    this.princessBlock = game.add.sprite(570, 140, 'princess-block')
    game.physics.arcade.enable(this.princessBlock)
    this.princessBlock.body.enable = true
    this.princessBlock.body.immovable = true
    this.princessBlockSayOnce = true

    this.anotherCastle = game.add.audio('another-castle')
    this.marioWords = game.add.audio('mario-last-words')
  },

  update () {
    game.physics.arcade.collide(this.mario, this.floor)
    game.physics.arcade.collide(this.mario, this.doorBlock)
    game.physics.arcade.collide(this.mario, this.princessBlock, this.lastWords, null, this)

    // playe controls
    this.movePlayer()

    // open book
    if (game.input.keyboard.isDown(this.openBookButton)) {
      this.showQuestions()
    }

    // show lock screen
    if (game.input.keyboard.isDown(this.openLockButton)) {
      this.showScreen()
    }

    // open the door if user insert correct code
    if (this.userCode.text === this.code) {
      this.openDoorFunc()
    }
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

  insertCode (char) {
    if (this.lockIsEnable) {
      if (this.codeArr.length < 5) {
        this.codeArr.push(char)
      }
      this.userCode.text = this.codeArr.join('')

      if (this.codeArr.length === 5 && this.userCode.text !== this.code) {
        this.wrongCode()
      }
    }
  },

  showScreen () {
    this.lockIsEnable = true
    game.add.tween(this.screen).to({ x: this.screen.x = 400 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
  },

  // hide lock screen sprite
  spriteDestroy () {
    this.lockIsEnable = false
    game.add.tween(this.screen).to({ x: this.screen.x = -300 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
    this.userCode.text = ''
    this.codeArr = []
  },

  showQuestions () {
    game.add.tween(this.openBook).to({ x: this.openBook.x = 400 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
  },

  closeQuestionsBook () {
    game.add.tween(this.openBook).to({ x: this.openBook.x = -300 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
  },

  openDoorFunc () {
    this.doorBlock.body.enable = false
    this.doorBlock.alpha = 0
    this.spriteDestroy()
    this.lock.destroy()
  },

  wrongCode () {
    this.userCode.text = 'wrong'
  },

  lastWords () {
    if (this.princessBlockSayOnce) {
      setTimeout(() => {
        this.anotherCastle.play()
        this.princessBlockSayOnce = false
      }, 200)
    }
    setTimeout(() => {
      this.marioWords.play()
    }, 3700)

    setTimeout(() => {
      this.shoot.play()
    }, 6000)

    setTimeout(() => {
      this.shoot.play()
    }, 6600)

    setTimeout(() => {
      game.state.start('win')
    }, 7000)
  }
}
