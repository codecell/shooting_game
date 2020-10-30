import Phaser from 'phaser';

import Button from '../utils/Button';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    // Final score
    this.scoreText = this.add.text(40, 150, '', { fontSize: '23px', fill: '#f6830f' });

    const score = sessionStorage.getItem('score');
    const prettyDisplay = `
      --- Your Score ---

              ${window.score}
    `;
    this.scoreText.setText(`${prettyDisplay}`);

    this.buttonRestart = new Button(this, 250, 320, 'blueButton1', 'blueButton2', 'Restart', 'Game');

    // Options
    this.optionsButton = new Button(this, 250, 320 + 100, 'blueButton1', 'blueButton2', 'Options', 'Options');
  }
}

export default GameOver;