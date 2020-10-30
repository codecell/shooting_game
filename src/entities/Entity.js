import 'phaser';
import Player from './Player'
import { Game } from '../scenes'

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canDestroy) {
    if (!this.getData("isDead")) {
      this.setTexture("explosionImg");
      this.play("explosionImg");
      this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();

      // Update score in Realtime
      if ((this.__proto__.constructor !== Player) && (this.scene.__proto__.constructor == Game)) {
        this.scene.score.counter += 5;

        this.scene.scoreText.setText(`Score: ${this.scene.score.counter}`);
      }

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.on('animationcomplete', function() {
        if (canDestroy) {
          this.destroy();
        }
        else {
          this.setVisible(false);
        }
      }, this);
      
      this.setData("isDead", true);
    }
  }
}

export default Entity;