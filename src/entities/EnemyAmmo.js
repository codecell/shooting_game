import Entity from './Entity';

class EnemyAmmo extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyAmmoImage');
    this.body.velocity.y = 200;
  }
}

export default EnemyAmmo;