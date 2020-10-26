import logoImg from "../assets/logo.png";
import Phaser from 'phaser'

class Menu extends Phaser.Scene {
  preload() {
    // this.load.image("logo", logoImg);
  }

  create() {
    // const logo = this.add.image(400, 150, "logo");
    this.title = this.add.text(
      this.game.config.width * 0.5, 128,
      `Shooting Game`,
        {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'grey',
      align: 'center'
    });
  
    this.title.setOrigin(0.5);  
  
    this.tweens.add({
      targets: [this.title],
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }
}

export default Menu
