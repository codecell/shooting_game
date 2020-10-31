import { resourcesRefs, musicDetails } from '../utils/creditsUtils';
import { scoreSorter } from '../utils/scorecard';

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

test('function scoreSorter util: should sort scores in DESCENDING order', () => {
  const testArr = [{ score: 20 }, { score: 100 }];
  const result = scoreSorter(testArr);

  expect(result).toBeDefined();
  expect(result).toBeTruthy();
  expect(result).toEqual([{ score: 100 }, { score: 20 }]);
});