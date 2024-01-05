import { expect, test } from 'vitest';
import {
  _luminance,
  _contrast,
  _calculateRgbFactors,
  _blendPalette,
  _decimalToHex,
  generatePalette,
  getPlayerBackgroundRgb,
  hasMinimumContrast,
  sortByHighToLowContrast,
  rgbToHex,
  hexToRgb,
  lightenDarkenColor,
} from '@js/palette-utils';

test(`_luminance([192, 163, 131]) returns 0.39039546816477494`, async () => {
  const actual = _luminance([192, 163, 131]);
  expect(actual).toStrictEqual(0.39039546816477494);
});

test(`_luminance([28, 18, 14]) returns 0.007111950818261939`, async () => {
  const actual = _luminance([28, 18, 14]);
  expect(actual).toStrictEqual(0.007111950818261939);
});

test(`_decimalToHex(9) is '09'`, async () => {
  expect(_decimalToHex(9)).toEqual('09');
});

test(`_decimalToHex(10) is '0a'`, async () => {
  expect(_decimalToHex(10)).toEqual('0a');
});

test(`_decimalToHex(15) is '0f'`, async () => {
  expect(_decimalToHex(15)).toEqual('0f');
});

test(`_contrast([192, 163, 131], [28, 18, 14]) returns 7.7110913189810955`, async () => {
  const actual = _contrast([192, 163, 131], [28, 18, 14]);
  expect(actual).toStrictEqual(7.7110913189810955);
});

test(`_contrast([255, 20, 147], [255, 255, 0]) returns 0.007111950818261939`, async () => {
  const actual = _contrast([255, 20, 147], [255, 255, 0]);
  expect(actual).toStrictEqual(3.387271031207384);
});

test(`_calculateRgbFactors([192, 163, 131], [28, 18, 14]) returns RGB factors`, async () => {
  const actual = _calculateRgbFactors([192, 163, 131], [28, 18, 14]);
  expect(actual).toStrictEqual([-82, -72.5, -58.5]);
});

test(`_calculateRgbFactors([255, 20, 147], [255, 255, 0]) returns RGB factors`, async () => {
  const actual = _calculateRgbFactors([255, 20, 147], [255, 255, 0]);
  expect(actual).toStrictEqual([0, 117.5, -73.5]);
});

test(`_blendPalette([-82, -72.5, -58.5], [192, 163, 131], [28, 18, 14]) returns the palette`, async () => {
  const actual = _blendPalette([-82, -72.5, -58.5], [192, 163, 131], [28, 18, 14]);
  expect(actual).toStrictEqual([
    [192, 163, 131],
    [110, 91, 73],
    [28, 18, 14],
  ]);
});

test(`_blendPalette([0, 117.5, -73.5], [255, 20, 147], [255, 255, 0]) returns the palette`, async () => {
  const actual = _blendPalette([0, 117.5, -73.5], [255, 20, 147], [255, 255, 0]);
  expect(actual).toStrictEqual([
    [255, 20, 147],
    [255, 138, 74],
    [255, 255, 0],
  ]);
});

test(`generatePalette([192, 163, 131], [28, 18, 14]) generates the palette`, async () => {
  const actual = generatePalette([192, 163, 131], [28, 18, 14]);
  expect(actual).toStrictEqual([
    [192, 163, 131],
    [110, 91, 73],
    [28, 18, 14],
  ]);
});

test(`generatePalette([255, 20, 147], [255, 255, 0]) generates the palette`, async () => {
  const actual = generatePalette([255, 20, 147], [255, 255, 0]);
  expect(actual).toStrictEqual([
    [255, 20, 147],
    [255, 138, 74],
    [255, 255, 0],
  ]);
});

test(`getPlayerBackgroundRgb([209, 77, 48], [29, 35, 41]) gives [119, 56, 45]`, async () => {
  const actual = getPlayerBackgroundRgb([209, 77, 48], [29, 35, 41]);
  expect(actual).toStrictEqual([119, 56, 45]);
});

test(`getPlayerBackgroundRgb([192, 163, 131], [28, 18, 14]) gives [110, 91, 73]`, async () => {
  const actual = getPlayerBackgroundRgb([192, 163, 131], [28, 18, 14]);
  expect(actual).toStrictEqual([110, 91, 73]);
});

test(`hasMinimumContrast([29, 35, 41], [255, 255, 255]) is true`, async () => {
  const actual = hasMinimumContrast([29, 35, 41], [255, 255, 255]);
  expect(actual).toBeTruthy();
});

test(`hasMinimumContrast([47, 76, 114], [255, 255, 255]) is true`, async () => {
  const actual = hasMinimumContrast([47, 76, 114], [255, 255, 255]);
  expect(actual).toBeTruthy();
});

test(`hasMinimumContrast([196, 160, 161], [255, 255, 255]) is false`, async () => {
  const actual = hasMinimumContrast([196, 160, 161], [255, 255, 255]);
  expect(actual).toBeFalsy();
});

test(`hasMinimumContrast([146, 160, 172], [255, 255, 255]) is false`, async () => {
  const actual = hasMinimumContrast([146, 160, 172], [255, 255, 255]);
  expect(actual).toBeFalsy();
});

test(`sortByHighToLowContrast([215, 116, 94], [29, 35, 41], [130, 82, 64]) is true`, async () => {
  const actual = sortByHighToLowContrast([215, 116, 94], [29, 35, 41], [130, 82, 64]);
  expect(actual).toBeTruthy();
});

test(`sortByHighToLowContrast([215, 116, 94], [130, 82, 64], [47, 76, 114]) is false`, async () => {
  const actual = sortByHighToLowContrast([215, 116, 94], [130, 82, 64], [47, 76, 114]);
  expect(actual).toBeFalsy();
});

test(`sortByHighToLowContrast([220, 208, 176], [205, 47, 49], [130, 31, 40]) is false`, async () => {
  const actual = sortByHighToLowContrast([220, 208, 176], [205, 47, 49], [130, 31, 40]);
  expect(actual).toBeFalsy();
});

test(`sortByHighToLowContrast([220, 208, 176], [35, 30, 72], [92, 60, 124]) is true`, async () => {
  const actual = sortByHighToLowContrast([220, 208, 176], [35, 30, 72], [92, 60, 124]);
  expect(actual).toBeTruthy();
});

test(`rgbToHex(35, 30, 72) is #231e48`, async () => {
  expect(rgbToHex(35, 30, 72)).toEqual('#231e48');
});

test(`rgbToHex(205, 47, 49) is #cd2f31`, async () => {
  expect(rgbToHex(205, 47, 49)).toEqual('#cd2f31');
});

test(`hexToRgb('cd2f31') is [205, 47, 49]`, async () => {
  expect(hexToRgb('cd2f31')).toEqual([205, 47, 49]);
  expect(hexToRgb('#cd2f31')).toEqual([205, 47, 49]);
});

test(`hexToRgb('231e48') is [35, 30, 72]`, async () => {
  expect(hexToRgb('231e48')).toEqual([35, 30, 72]);
  expect(hexToRgb('#231e48')).toEqual([35, 30, 72]);
});

test(`lightenDarkenColor([120, 39, 61], -20) is [96, 31, 49]`, async () => {
  expect(lightenDarkenColor([120, 39, 61], -20)).toEqual([96, 31, 49]);
});

test(`lightenDarkenColor([120, 39, 61], -60) is [48, 16, 24]`, async () => {
  expect(lightenDarkenColor([120, 39, 61], -60)).toEqual([48, 16, 24]);
});

test(`lightenDarkenColor([120, 39, 61], 20) is [144, 47, 73]`, async () => {
  expect(lightenDarkenColor([120, 39, 61], 20)).toEqual([144, 47, 73]);
});
