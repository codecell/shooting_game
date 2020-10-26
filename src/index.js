import Phaser from "phaser";
// scenes
import Menu from './scenes/Menu'

const config = {
  type: Phaser.WEBGL,
  backgroundColor: "black",
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    Menu,
  ],
  pixelArt: true,
  roundPixels: true
};

new Phaser.Game(config);


