import 'phaser';
import Logo from '../assets/logo.png'

import btnRestart from "../assets/btnRestart.png";
import btnRestartHover from "../assets/btnRestartHover.png";
import btnRestartDown from "../assets/btnRestartDown.png";

import Button from '../utils/Button'
 
class GameOver extends Phaser.Scene {
  constructor () {
    super("GameOver");
  }
 
  preload () {
    this.load.image('logo', Logo);

    this.load.image("btnRestart", btnRestart);
    this.load.image("btnRestartHover", btnRestartHover);
    this.load.image("btnRestartDown", btnRestartDown);
  }
   
  create () {
    this.buttonRestart = new Button(this, 250, 320, 'blueButton1', 'blueButton2', 'Restart', 'Game');

     // Options
     this.optionsButton = new Button(this, 250, 320 + 100, 'blueButton1', 'blueButton2', 'Options', 'Options');
  }
  
};

export default GameOver