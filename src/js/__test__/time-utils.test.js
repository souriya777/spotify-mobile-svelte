import { expect, test } from 'vitest';
import { millisToMinuteSecond, percentToMillis } from '@/js/time-utils';

test(`60000ms returns 1:00`, async () => {
  expect(millisToMinuteSecond(60000)).toBe('1:00');
});

test(`94000ms returns 1:00`, async () => {
  expect(millisToMinuteSecond(94000)).toBe('1:34');
});

test(`57000ms returns 0:57`, async () => {
  expect(millisToMinuteSecond(57000)).toBe('0:57');
});

test(`419000ms returns 6:59`, async () => {
  expect(millisToMinuteSecond(419000)).toBe('6:59');
});

test(`50% of 3:00 returns 90000ms`, async () => {
  expect(percentToMillis(50, 180000)).toBe(90000);
});

test(`100% of 3:00 returns 180000ms`, async () => {
  expect(percentToMillis(100, 180000)).toBe(180000);
});

test(`22% of 4:52 returns 180000ms`, async () => {
  expect(percentToMillis(22, 292000)).toBe(64240);
});
