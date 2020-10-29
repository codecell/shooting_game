import 'phaser';
import Button from '../utils/Button' 

export default class Title extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  create () {
    // config.height/2 = 300, config.width/2 = 400
     // Game
    this.gameButton = new Button(this, 400, 300 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, 400, 300, 'blueButton1', 'blueButton2', 'Options', 'Options');
  
    // Credits
    this.creditsButton = new Button(this, 400, 300 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');


    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
};