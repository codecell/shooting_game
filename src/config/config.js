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
  width: 500,
  height: 640,
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
