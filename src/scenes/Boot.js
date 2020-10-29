import 'phaser';
import Logo from '../assets/logo.png'
 
class Boot extends Phaser.Scene {
  constructor () {
    super("Boot");
  }
 
  preload () {
    this.load.image('logo', Logo);
  }
   
  create () {
    this.scene.start('Preloader');
  }
};

export default Boot