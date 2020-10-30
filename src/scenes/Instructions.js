import 'phaser';
import Button from '../utils/Button' 
import { instructionsText, instructionsSceneTitle,
  renderInstrunctionSceneInfo
 } from '../utils/constants';

export default class Instructions extends Phaser.Scene {
  constructor () {
    super('Instructions');
  }
 
  create () {
    // config.height/2 = 320, config.width/2 = 250

    this.title = renderInstrunctionSceneInfo(this.add, instructionsSceneTitle, this.game.config.width, 0.5, 75, 30);
    this.title.setOrigin(0.5);

    this.instructions = renderInstrunctionSceneInfo(this.add, instructionsText, this.game.config.width, 0.45, 295, 17);
    this.instructions.setOrigin(0.5);
    
    const halfWidth = 500/2;
    const halfHeight = 640/2;
     
    // Instructions
    this.instructionsButton = new Button(this, halfWidth, halfHeight + 200, 'blueButton1', 'blueButton2', 'Menu', 'Menu');


    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
};