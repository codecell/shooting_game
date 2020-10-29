import 'phaser';
import Logo from '../assets/logo.png'

import btnRestart from "../assets/btnRestart.png";
import btnRestartHover from "../assets/btnRestartHover.png";
import btnRestartDown from "../assets/btnRestartDown.png";
 
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
    // this.scene.start('Options');

    this.buttonRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "btnRestart"
    );
    this.buttonRestart.setInteractive();

    this.buttonRestart.on("pointerover", function() {
      this.buttonRestart.setTexture("btnRestartHover");
      // this.sfx.btnOver.play();
    }, this);

    this.buttonRestart.on("pointerout", function() {
      this.setTexture("btnRestart");
    });

    this.buttonRestart.on("pointerdown", function() {
      this.buttonRestart.setTexture("btnRestartDown");
      // this.sfx.btnDown.play();
    }, this);

    this.buttonRestart.on("pointerup", function() {
      this.buttonRestart.setTexture("btnRestart");
      this.scene.start("Game");
    }, this);
  }
};

export default GameOver