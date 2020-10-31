import Phaser from 'phaser';
import Button from '../utils/Button';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    // config.height/2 = 320, config.width/2 = 250
    this.title = this.add.text(
      this.game.config.width * 0.5, 128,
      'Shooting Game',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: 'grey',
        align: 'center',
      },
    );

    this.title.setOrigin(0.5);

    const halfWidth = 500 / 2;
    const halfHeight = 640 / 2;
    // Game
    this.gameButton = new Button(
      this, halfWidth, halfHeight - 100, 'blueButton1', 'blueButton2', 'Play', 'Game',
    );

    // Options
    this.optionsButton = new Button(
      this, halfWidth, halfHeight, 'blueButton1', 'blueButton2', 'Options', 'Options',
    );

    // Credits
    this.creditsButton = new Button(
      this, halfWidth, halfHeight + 70, 'blueButton1', 'blueButton2', 'Credits', 'Credits',
    );

    // Instructions
    this.instructionsButton = new Button(
      this, halfWidth, halfHeight + 2*70, 'blueButton1', 'blueButton2', 'Guides', 'Instructions',
    );

    this.leadersButton = new Button(
      this, halfWidth, halfHeight + 3*70, 'blueButton1', 'blueButton2', 'Top Scores', 'LeaderBoard'
    );

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}