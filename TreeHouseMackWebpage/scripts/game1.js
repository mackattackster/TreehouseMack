///<reference> path="../phaser.js" />;

var GameState = function (game) { };

GameState.prototype.preload = function () {
    this.game.load.image('ground', '../assets/gfx/ground.png');
    this.game.load.image('player', '../assets/gfx/player.png');
};

GameState.prototype.create = function () {
    this.game.stage.backgroundColor = 0x448cc;

    this.MAX_SPEED = 500;

    this.player = this.game.add.sprite(this.game.width / 2, this.game.height - 64, 'player');

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.collideWorldBounds = true;

    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);

    this.ground = this.game.add.group();
    for (var x = 0; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
};

GameState.prototype.update = function () {
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');
    }

    // Collide the player with the ground
    this.game.physics.arcade.collide(this.player, this.ground);

    if (this.leftInputIsActive()) {
        // If the LEFT key is down, set the player velocity to move left
        this.player.body.velocity.x = -this.MAX_SPEED;
    } else if (this.rightInputIsActive()) {
        // If the RIGHT key is down, set the player velocity to move right
        this.player.body.velocity.x = this.MAX_SPEED;
    } else {
        // Stop the player from moving horizontally
        this.player.body.velocity.x = 0;
    }
};

GameState.prototype.leftInputIsActive = function () {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x < this.game.width / 4);

    return isActive;
};

GameState.prototype.rightInputIsActive = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

    return isActive;
};

var game = new Phaser.Game(820, 450, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);