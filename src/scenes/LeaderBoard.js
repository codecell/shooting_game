import Phaser from 'phaser';
import Button from '../utils/Button';
import { leaderBoard, getLeaderBoard } from '../utils/scorecard';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    for (let index = 0; index < 10; index++) {
      const verticalLocus = 140;

      const gameDetails = window.scoreSheet[index];

      const color = index < 3 ? 'green' : 'grey';

      gameDetails && this.add.text(
        this.game.config.width * 0.25, verticalLocus + index * 30,
        `${index + 1}. ${gameDetails.user}  ̶̶̶   ${gameDetails.score}`,
        {
          fontFamily: 'monospace',
          fontSize: 20,
          fontStyle: 'bold',
          color,
          align: 'center',
        },
      );
    }

    this.title = this.add.text(
      this.game.config.width * 0.5, 80,
      'Leader Board',
      {
        fontFamily: 'monospace',
        fontSize: 32,
        fontStyle: 'bold',
        color: 'grey',
        align: 'center',
      },
    );

    this.title.setOrigin(0.5);

    const halfWidth = 500 / 2;
    const halfHeight = 490;

    // Options
    this.optionsButton = new Button(
      this, halfWidth, halfHeight, 'blueButton1', 'blueButton2', 'Options', 'Options',
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