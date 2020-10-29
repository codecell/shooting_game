import Phaser from 'phaser';
import config from './config/config';
import Model from './model'

// scenes
import {
  Boot, Preloader, 
  Title, Options,
  Credits, Menu, Game
} from './scenes'


class ShootingGame extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    
    // this.scene.add('Boot', Boot);
    // this.scene.add('Preloader', Preloader);
    // this.scene.add('Title', Title);
    // this.scene.add('Options', Options);
    // this.scene.add('Credits', Credits);
    // this.scene.add('Game', Game);

    // this.scene.start('Game');
  }
}
 
window.game = new ShootingGame();