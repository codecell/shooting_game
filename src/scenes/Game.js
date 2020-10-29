import 'phaser';

// images
import logo from '../assets/logo.png'
import asteroidImage from '../assets/asteroid.png'
import playerImage from '../assets/player.png'
import enemyAimage from '../assets/enemyAimage.png'
import enemyBimage from '../assets/enemyBimage.png'
import bgA from '../assets/bgA.png'
import bgB from '../assets/bgB.png'

import explosionImage from '../assets/explosionImg.PNG'
import enemyAmmoImage from '../assets/enemyAmmoImage.png';
import playerAmmoImage from '../assets/playerAmmoImage.png'

// Audio
import laserSound from '../assets/sounds/laserSound.wav'
import explode1 from '../assets/sounds/explodeA.wav'
import explode2 from '../assets/sounds/explodeB.wav'
import explode3 from '../assets/sounds/explodeC.wav'


// entities
import {
  Player, EnemyA, EnemyB, Asteroid, Background
} from '../entities'
 
export default class Game extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    const ImageAssetsHash = {
      'logo': logo,
      'asteroid': asteroidImage,
      'enemyBimage': enemyBimage,
      'player': playerImage,
      'enemyAmmoImage': enemyAmmoImage,
      'playerAmmoImage': playerAmmoImage,
      'bgA': bgA,
      'bgB': bgB
    }

    for (let key in ImageAssetsHash) {
      // load images
      this.load.image(key, ImageAssetsHash[key]);
    }

    this.load.spritesheet("explosionImg", explosionImage, {
      frameWidth: 30,
      frameHeight: 28
    });

    this.load.spritesheet("enemyAimage", enemyAimage, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.audio("laserSound", laserSound);
    this.load.audio('explodeA', explode1);
    this.load.audio('explodeB', explode2);
    this.load.audio('explodeC', explode3);
  }
 
  create () {
    // this.add.image(400, 300, 'logo');

    this.anims.create({
      key: 'enemyAimage',
      frames: this.anims.generateFrameNumbers('enemyAimage'),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explosionImg",
      frames: this.anims.generateFrameNumbers("explosionImg"),
      frameRate: 20,
      repeat: 0
    });

    this.sfx = {
      explosions: [
        this.sound.add('explodeA'),
        this.sound.add('explodeB'),
        this.sound.add('explodeC')
      ],
      laser: this.sound.add("laserSound")
    };

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var bg = new Background(this, 'bgA', i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height - 100,
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
      callback: () => {
        let enemy = null;
        const randomLocus = Phaser.Math.Between(0, this.game.config.width);

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyA(this, randomLocus, 0);
        } else if (Phaser.Math.Between(0, 10) >= 5 && this.getEnemyType("Asteroid").length < 5) {
          enemy = new Asteroid(this, randomLocus, 0);
        } else {
          enemy = new EnemyB(this, randomLocus, 0);
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


    this.doCollision(this.enemies, this.player);
    this.doCollision(this.enemyAmmos, this.player);
    this.doCollision(this.playerAmmos)

    this.backgrounds.forEach((bg) => {
      bg.update();
    })
  }

  getEnemyType(type) {
    const arr = [];

    this.enemies.getChildren().forEach((adversary) => {
      if (adversary.getData("type") == type) {
        arr.push(adversary);
      };
    })

    return arr;
  }

  doCollision (entityA, entityB = false) {
    entityA.getChildren().forEach((adversary) => {
      adversary.update();

      if (adversary.x < -adversary.displayWidth ||
        adversary.x > this.game.config.width + adversary.displayWidth ||
        adversary.y < -adversary.displayHeight * 4 ||
        adversary.y > this.game.config.height + adversary.displayHeight) {
        if (adversary) {
          if (adversary.onDestroy !== undefined) {
            adversary.onDestroy();
          }
          adversary.destroy();
        }
      }

      entityB && this.physics.add.overlap(entityB, entityA, (player, adversary) => {
        if (!player.getData("isDead") &&
            !adversary.getData("isDead")) {
          player.explode(false);
          player.onDestroy();
          adversary.explode(true);
        };
      });
    });
  }
};