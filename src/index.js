import Phaser from 'phaser';
import config from './config/config';
import Model from './model'

import './assets/css/style.css'

window.score = 0;


class ShootingGame extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}
 
window.game = new ShootingGame();