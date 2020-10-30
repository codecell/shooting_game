import 'phaser';

import Button from '../utils/Button'
 
class GameOver extends Phaser.Scene {
  constructor () {
    super("GameOver");
  }
   
  create () {
    this.buttonRestart = new Button(this, 250, 320, 'blueButton1', 'blueButton2', 'Restart', 'Game');

     // Options
     this.optionsButton = new Button(this, 250, 320 + 100, 'blueButton1', 'blueButton2', 'Options', 'Options');
  }
  
};

export default GameOver