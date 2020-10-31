import Phaser from 'phaser';

import Button from '../utils/Button';
import { postScore } from '../utils/scorecard';

class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    // info
    const infoMessage = `
      * NOTE 
      To use any of the 
      control key letters (A, S, D, W, SPACE) in your NAME, 
      Press SHIFT + KEY. e.g,
        --- 
            A = Caps-lock OFF   +  shift  +  key A 
            a = Caps-lock ON  +  shift  +  Key A 
        ---
        e.t.c.
    `;
    this.info = this.add.text(
      5, 10, infoMessage, { fontSize: '14px', fill: 'grey', fontFamily: 'monospace' },
    );
    // Final score
    this.scoreText = this.add.text(40, 150, '', { fontSize: '22px', fill: '#f6830f' });

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
    playerNameTag.setAttribute('autocomplete', 'off');

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

    const vertPoint = 440;

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