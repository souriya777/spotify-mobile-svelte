import { expect, test } from 'vitest';
import { millisToMinuteSecond } from '@/js/time-utils';

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
