﻿/// <reference path="../phaser/phaser.d.ts" />
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'coolgame', { preload: this.preload, create: this.create });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('logo', '../assets/gfx/flag.png');
    };

    SimpleGame.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    };
    return SimpleGame;
})();

window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map
