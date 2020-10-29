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
    delay: 1000,
    onComplete: ((tweenTarget) => {
      tweenTarget.destroy;

      if (bool) {
        scene.start('Title')
      }
      
    }).bind(model)
  });
}

export {
  musicDetails, resourcesRefs,
  displayItem, renderCreditTween
}