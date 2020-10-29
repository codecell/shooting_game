import 'phaser';
import {
  resourcesRefs, musicDetails,
  displayItem, renderCreditTween,
} from '../utils/constants'
 
export default class Credits extends Phaser.Scene {
  constructor () {
    super('Credits');
  }
 
  create () {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Alfred Ezaka', { fontSize: '26px', fill: '#fff' });
    this.musicByText = this.add.text(0, 0, musicDetails, { fontSize: '26px', fill: '#fff' });
    this.resourcesText = this.add.text(0, 0, resourcesRefs, { fontSize: '18px', fill: '#fff' });

    // (config.width/2, config.height/2, config.width, config.height);
    this.zone = this.add.zone(250, 320, 500, 640);
    
    displayItem(this.creditsText, this.zone);
    displayItem(this.madeByText, this.zone);
    displayItem(this.musicByText, this.zone);
    displayItem(this.resourcesText, this.zone);
    
    this.creditsText.setY(500)
    this.musicByText.setY(600);
    this.resourcesText.setY(750);
    this.madeByText.setY(1000);    

    this.creditsTween = renderCreditTween(
      this.tweens, this.creditsText, this.creditsTween,  this.scene, 4000, this
    );

    this.musicByTween = renderCreditTween(
      this.tweens, this.musicByText, this.musicByTween,  this.scene, 5000, this
    );

    this.resourcesByTween = renderCreditTween(
      this.tweens, this.resourcesText, this.resourcesByTween,  this.scene, 6000, this, true
    );

    this.madeByTween = renderCreditTween(
      this.tweens, this.madeByText, this.madeByTween,  this.scene, 7000, this
    );
  }
};