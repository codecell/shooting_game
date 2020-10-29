import 'phaser';
import Logo from '../assets/logo.png'
 
class GameOver extends Phaser.Scene {
  constructor () {
    super("GameOver");
  }
 
  preload () {
    this.load.image('logo', Logo);
  }
   
  create () {
    this.scene.start('Options');
  }
};

export default GameOver