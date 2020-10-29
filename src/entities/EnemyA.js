import Entity from "./Entity"
import EnemyAmmo from "./EnemyAmmo"

class EnemyA extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemyAimage", "EnemyA");
    this.play("enemyAimage");
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        const laser = new EnemyAmmo(this.scene, this.x, this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyAmmos.add(laser);
      },
      callbackScope: this,
      loop: true
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export default EnemyA;