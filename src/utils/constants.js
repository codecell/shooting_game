const musicDetails = `
  Music By: Zack Hemsey

  Song Title: The Way
`

const resourcesRefs = `
  Explosion Sounds: Master484

  Asteriod: DcZanick

  Background: Scorcher24
`

const displayItem = (item, zone) => {
  return Phaser.Display.Align.In.Center(
    item,
    zone
  );
}

const renderCreditTween = (tweens, target, tweenTarget, scene, duration, model,  bool) => {
  return tweens.add({
    targets: target,
    y: -300,
    ease: 'Power1',
    duration: duration,
    delay: 200,
    onComplete: ((tweenTarget) => {
      tweenTarget.destroy;

      if (bool) {
        scene.start('Menu')
      }

    }).bind(model)
  });
}

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

const instructionsSceneTitle = `Instructions`;

const renderInstrunctionSceneInfo = (add, content, widthz, x, y,  fontSize) => {
  return add.text(
    widthz * x, y,
    content,
      {
    fontFamily: 'monospace',
    fontSize,
    fontStyle: 'bold',
    color: 'grey',
    align: 'center'
  });
}



export {
  musicDetails, resourcesRefs, instructionsSceneTitle,
  displayItem, renderCreditTween, instructionsText,
  renderInstrunctionSceneInfo
}