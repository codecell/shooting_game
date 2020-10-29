import 'phaser';

// images
import logo from '../assets/logo.png'
import asteroidImage from '../assets/asteroid.png'
import playerImage from '../assets/player.png'
import enemyAimage from '../assets/enemyAimage.png'
import enemyBimage from '../assets/enemyBImage.png'

import explosionImage from '../assets/explosionImg.PNG'
import enemyAmmoImage from '../assets/enemyAmmoImage.png';
import playerAmmoImage from '../assets/playerAmmoImage.png'

// Audio
import laserSound from '../assets/sounds/laserSound.wav'

// entities
import Player from '../entities/Player'
import EnemyA from '../entities/EnemyA'
import EnemyB from '../entities/EnemyB'
import Asteroid from '../entities/Asteroid'
 
export default class Game extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    const loadImages = {
      'logo': logo,
      'asteroid': asteroidImage,
      'enemyAimage': enemyAimage,
      'enemyBimage': enemyBimage,
      'player': playerImage,
      'enemyAmmoImage': enemyAmmoImage,
      'playerAmmoImage': playerAmmoImage
    }

    for (let key in loadImages) {
      // load images
      this.load.image(key, loadImages[key]);
    }

    this.load.spritesheet("explosionImg", explosionImage, {
      frameWidth: 30,
      frameHeight: 28
    });

    // this.load.spritesheet("enemyAimage", enemyAimage, {
    //   frameWidth: 16,
    //   frameHeight: 16
    // });
    this.load.audio("laserSound", laserSound);
  }
 
  create () {
    // this.add.image(400, 300, 'logo');

    this.anims.create({
      key: enemyAimage,
      frames: this.anims.generateFrameNumbers(enemyAimage),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explosionImg",
      frames: this.anims.generateFrameNumbers("explosionImg"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "player",
      frames: this.anims.generateFrameNumbers(playerImage),
      frameRate: 20,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        // this.sound.add("sndExplode0"),
        // this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("laserSound")
    };

    this.backgrounds = [];
    // for (var i = 0; i < 5; i++) {
    //   var bg = new ScrollingBackground(this, "sprBg0", i * 10);
    //   this.backgrounds.push(bg);
    // }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "player"
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyAmmos = this.add.group();
    this.playerAmmos = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        var enemy = null;
        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyA(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("Asteroid").length < 5) {
            enemy = new Asteroid(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        }
        else {
          enemy = new EnemyB(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerAmmos, this.enemies, (playerAmmo, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerAmmo.destroy();
      }
    });
  }

  update () {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
        this.player.moveRight();
      }
      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }

      this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
        if (!player.getData("isDead") &&
            !enemy.getData("isDead")) {
          player.explode(false);
          player.onDestroy();
          enemy.explode(true);
        }
      });
    }

    for (var i = 0; i < this.enemyAmmos.getChildren().length; i++) {
      var laser = this.enemyAmmos.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }

      this.physics.add.overlap(this.player, this.enemyAmmos, function(player, laser) {
        if (!player.getData("isDead") &&
            !laser.getData("isDead")) {
          player.explode(false);
          player.onDestroy();
          laser.destroy();
        }
      });
    }

    for (var i = 0; i < this.playerAmmos.getChildren().length; i++) {
      var laser = this.playerAmmos.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
};