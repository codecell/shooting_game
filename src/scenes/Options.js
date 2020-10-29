import 'phaser';
import Button from '../utils/Button'
 
export default class Options extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  create () {
    this.model = this.sys.game.globals.model;
    
    this.text = this.add.text(190, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(170, 200, 'checkedBox');
    this.musicText = this.add.text(210, 190, 'Music Enabled', { fontSize: 24 });
    
    this.soundButton = this.add.image(170, 200 + 100, 'checkedBox');
    this.soundText = this.add.text(210, 190 + 100, 'Sound Enabled', { fontSize: 24 });
    
    this.musicButton.setInteractive();
    this.soundButton.setInteractive();
    
    this.musicButton.on('pointerdown', function () {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));
    
    this.soundButton.on('pointerdown', function () {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));
    
    this.updateAudio();

    this.menuButton = new Button(this, 270, 320 + 100, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
     
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
};