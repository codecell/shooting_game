import Phaser from 'phaser';
import Boot from '../scenes/Boot';
import Preloader from '../scenes/Preloader';
import Menu from '../scenes/Menu';
import Credits from '../scenes/Credits';
import Instructions from '../scenes/Instructions';
import Game from '../scenes/Game';
import GameOver from '../scenes/GameOver';
import Options from '../scenes/Options';
import LeaderBoard from '../scenes/LeaderBoard';

export default {
  type: Phaser.AUTO,
  backgroundColor: 'black',
  parent: 'phaser-example',
  width: 500,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [Boot, Preloader, Menu, Options, Credits, Instructions, Game, GameOver, LeaderBoard],
  pixelArt: true,
  roundPixels: true,
};
