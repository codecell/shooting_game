import Phaser from 'phaser';

const displayItem = (item, zone) => Phaser.Display.Align.In.Center(
  item,
  zone,
);

const renderCreditTween = (
  tweens, target, tweenTarget, scene, duration, model, bool,
) => tweens.add({
  targets: target,
  y: -300,
  ease: 'Power1',
  duration,
  delay: 200,
  onComplete: ((tweenTarget) => {
    tweenTarget.destroy;

    if (bool) {
      scene.start('Menu');
    }
  }),
});

const instructionsText = `
      ====== Movement =====

      Use Key:

        W - To move UP
        S - To move DOWN
        A - To move LEFT
        D - To move RIGHT

      ====== Attack ======

      Use Key:
      
        SPACE BAR - To SHOOT

      ====== Tip ======

      The Asteroids will come at
      you directly, Make them
      a priority on sight.
`;

const instructionsSceneTitle = 'Instructions';

const renderInstrunctionSceneInfo = (add, content, widthz, x, y, fontSize) => add.text(
  widthz * x, y,
  content,
  {
    fontFamily: 'monospace',
    fontSize,
    fontStyle: 'bold',
    color: 'grey',
    align: 'center',
  },
);

export {
  instructionsSceneTitle,
  displayItem, renderCreditTween, instructionsText,
  renderInstrunctionSceneInfo,
};