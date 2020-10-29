import 'phaser'
import Entity from "./Entity"

class EnemyB extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemyBimage", "EnemyB");
    this.play("enemyBimage");
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.scaleX = 0.15
    this.scaleY = 0.15
  }
}

export default EnemyB;