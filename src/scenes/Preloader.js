import 'phaser';
import Logo from '../assets/logo.png'
import BoxImg from '../assets/ui/grey_box.png';
import CheckmarkImg from '../assets/ui/boxCheckmark.png'
import BackgroundMusicFile from '../assets/bgMusic.wav';
import BlueButton1 from '../assets/ui/blue_button02.png';
import BlueButton2 from '../assets/ui/blue_button03.png';

 
class Preloader extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
    // add logo image
    // this.add.image(400, 300, Logo);
   
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const customLogo = this.add.image(400, 300, Logo);
    customLogo.setOrigin(0.05, 0.05)
   
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
   
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
   
    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
   
    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });
   
    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      // customLogo.destroy();
      this.ready();
    }.bind(this));
    
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
   
    // load assets needed in our game
    this.load.image('blueButton1', BlueButton1);
    this.load.image('blueButton2', BlueButton2);
    // this.load.image('logo', Logo);
    this.load.image('box', BoxImg);
    this.load.image('checkedBox', CheckmarkImg);
    this.load.audio('bgMusic', [BackgroundMusicFile]).start();
  }

  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.scene.start('Title');
    // this.scene.start('Credits');
    // this.scene.start('Options');

    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};

export default Preloader