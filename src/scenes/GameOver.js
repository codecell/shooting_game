import Phaser from 'phaser';

import Button from '../utils/Button';
import { postScore } from '../utils/scorecard';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    // Final score
    this.scoreText = this.add.text(40, 80, '', { fontSize: '23px', fill: '#f6830f' });

    const prettyDisplay = `
      --- Your Score ---

              ${window.score}
    `;
    this.scoreText.setText(`${prettyDisplay}`);

    const body = document.getElementsByTagName('body')[0];

    const wrapper = document.createElement('div');
    wrapper.classList.add('form-wrapper');

    const playerNameTag = document.createElement('input');
    playerNameTag.id = 'username';
    playerNameTag.setAttribute('placeholder', 'Enter your Name');

    const saveScoreBtn = document.createElement('button');
    saveScoreBtn.innerText = 'Save My score';
    saveScoreBtn.id = 'btnSaveScore';

    const flashTag = document.createElement('p');
    flashTag.id = 'flashTag';

    wrapper.appendChild(playerNameTag);
    wrapper.appendChild(saveScoreBtn);
    wrapper.appendChild(flashTag);

    body.append(wrapper);

    saveScoreBtn.addEventListener('click', () => {
      // send data
      postScore(playerNameTag.value, window.score);
    });

    const vertPoint = 400;

    this.buttonRestart = new Button(this, 250, vertPoint, 'blueButton1', 'blueButton2', 'Restart', 'Game');

    // Options
    this.optionsButton = new Button(this, 250, vertPoint + 70, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Options
    this.leadersButton = new Button(
      this, 250, vertPoint + 2 * 70, 'blueButton1', 'blueButton2', 'Top Scores', 'LeaderBoard',
    );
  }
}

export default GameOver;