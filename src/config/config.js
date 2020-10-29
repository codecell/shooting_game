import Phaser from 'phaser';
import {
  Boot, Preloader, 
  Title, Options,
  Credits, Menu, Game,
  GameOver
} from '../scenes'

export default {
  type: Phaser.AUTO,
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
  scene: [Boot, Preloader, Title, Options, Credits, Game, GameOver],
  pixelArt: true,
  roundPixels: true
};

// const game = new Phaser.Game(config);

// export default config;