import { expect, test } from 'vitest';
import {
  millisToMinuteSecond,
  progressPercentInteger,
  percentToMillis,
  areTimestampsSeparateBy,
} from '@js/time-utils';

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

test(`progress 101547ms for duration 203094ms is equal to 50%`, async () => {
  const progressMs = 101547;
  const durationMs = 203094;
  expect(progressPercentInteger(progressMs, durationMs)).toEqual(50);
});

test(`progress 103578ms for duration 203094ms is equal to 51%`, async () => {
  const progressMs = 103578;
  const durationMs = 203094;
  expect(progressPercentInteger(progressMs, durationMs)).toEqual(51);
});

test(`progressPercentInteger(): if wrong progressMs or durationMs provided, returns 0`, async () => {
  const progressMs = 103578;
  const durationMs = 203094;
  // @ts-ignore
  expect(progressPercentInteger('abc', durationMs)).toEqual(0);
  // @ts-ignore
  expect(progressPercentInteger(progressMs, 'abc')).toEqual(0);
});

test(`progressPercentInteger(): if durationMs equals 0, returns 0`, async () => {
  const progressMs = 103578;
  expect(progressPercentInteger(progressMs, 0)).toEqual(0);
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

test(`minGap between timestamp 2023_08_30__19_25_32 & timestamp 2023_08_30__19_25_34 is invalid`, async () => {
  const timestamp2023_08_30__19_25_32 = 1693416332002;
  const timestamp2023_08_30__19_25_34 = 1693416334002;
  const minGapMillis = 5000;
  expect(
    areTimestampsSeparateBy(
      timestamp2023_08_30__19_25_32,
      timestamp2023_08_30__19_25_34,
      minGapMillis,
    ),
  ).toBeFalsy();
});

test(`minGap between <null> & timestamp 2023_08_30__19_25_32 is valid`, async () => {
  const timestamp2023_08_30__19_25_32 = 1693416332002;
  const minGapMillis = 5000;
  expect(areTimestampsSeparateBy(null, timestamp2023_08_30__19_25_32, minGapMillis)).toBeTruthy();
});

test(`minGap between timestamp 2023_08_30__19_25_32 & timestamp 2023_08_30__19_25_38 is valid`, async () => {
  const timestamp2023_08_30__19_25_32 = 1693416332002;
  const timestamp2023_08_30__19_25_38 = 1693416338002;
  const minGapMillis = 5000;
  expect(
    areTimestampsSeparateBy(
      timestamp2023_08_30__19_25_32,
      timestamp2023_08_30__19_25_38,
      minGapMillis,
    ),
  ).toBeTruthy();
});

test(`minGap between timestamp 2023_08_30__19_25_32 & timestamp 2023_08_30__19_25_37 is valid`, async () => {
  const timestamp2023_08_30__19_25_32 = 1693416332002;
  const timestamp2023_08_30__19_25_37 = 1693416337002;
  const minGapMillis = 5000;
  expect(
    areTimestampsSeparateBy(
      timestamp2023_08_30__19_25_32,
      timestamp2023_08_30__19_25_37,
      minGapMillis,
    ),
  ).toBeTruthy();
});

test(`minGap between timestamp 2023_08_29__17_25_32 & timestamp 2023_08_30__19_25_32 is true`, async () => {
  const timestamp2023_08_29__17_25_32 = 1693329932000;
  const timestamp2023_08_30__19_25_32 = 1693416332002;
  const minGapMillis = 5000;
  expect(
    areTimestampsSeparateBy(
      timestamp2023_08_29__17_25_32,
      timestamp2023_08_30__19_25_32,
      minGapMillis,
    ),
  ).toBeTruthy();
});
