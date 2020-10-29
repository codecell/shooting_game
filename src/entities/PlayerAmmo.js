import Entity from "./Entity";

class PlayerAmmo extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "playerAmmoImage");
    this.body.velocity.y = -200;
  }
}

export default PlayerAmmo;
