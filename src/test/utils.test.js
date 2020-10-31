import { resourcesRefs, musicDetails } from '../utils/creditsUtils';

test('function musicDetails util: should return the appropriate Author credit format', () => {
  expect(musicDetails()).toBeDefined();
  expect(musicDetails()).toBeTruthy();
  expect(musicDetails()).toEqual(`
  Music By: Zack Hemsey

  Song Title: The Way
`);
});

test('function resourcesRefs util: should return the appropriate Resource owner credit format', () => {
  expect(resourcesRefs()).toBeDefined();
  expect(resourcesRefs()).toBeTruthy();
});