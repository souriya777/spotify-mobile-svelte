const DEFAULT_BACKGROUND_RGB = [18, 18, 18];
const DEFAULT_TEXT_RGB = [255, 255, 255];
const DEFAULT_BACKGROUND_ELEVATED_RGB = [26, 26, 26];
const DEFAULT_BACKGROUND_HIGHLIGHT_RGB = [40, 40, 40];
const BLENDED_COLOR_AFTER_START_COLOR_INDEX = 1;
const CONTRAST_MIN_RATIO = 4.5;
const RED_LUMINANCE = 0.2126;
const GREEN_LUMINANCE = 0.7152;
const BLUE_LUMINANCE = 0.0722;
const GAMMA = 2.4;
const DARKER_FACTOR = -20;

/**
 * @param {Array.<number, number, number>} rgb
 * @returns {number}
 */
function _luminance(rgb) {
  if (!rgb) {
    return;
  }

  let a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED_LUMINANCE + a[1] * GREEN_LUMINANCE + a[2] * BLUE_LUMINANCE;
}

/**
 * @param {number} decimal
 * @returns {string}
 */
function _decimalToHex(decimal) {
  const hex = decimal.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

/**
 * @param {Array.<number, number, number>} rgb1
 * @param {Array.<number, number, number>} rgb2
 * @returns {number}
 */
function _contrast(rgb1, rgb2) {
  const LUM1 = _luminance(rgb1);
  const LUM2 = _luminance(rgb2);
  const BRIGHTEST = Math.max(LUM1, LUM2);
  const DARKEST = Math.min(LUM1, LUM2);
  return (BRIGHTEST + 0.05) / (DARKEST + 0.05);
}

/**
 * @param {Array.<number, number, number>} colorStart
 * @param {Array.<number, number, number>} colorEnd
 * @returns {Array.<number, number, number>}
 */
function _calculateRgbFactors(colorStart, colorEnd) {
  const steps = BLENDED_COLOR_AFTER_START_COLOR_INDEX + 1;

  const result = new Array(3);
  result[0] = (colorEnd[0] - colorStart[0]) / steps;
  result[1] = (colorEnd[1] - colorStart[1]) / steps;
  result[2] = (colorEnd[2] - colorStart[2]) / steps;

  return result;
}

/**
 * @param {Array.<number, number, number>} rgbFactor
 * @param {Array.<number, number, number>} colorStart
 * @param {Array.<number, number, number>} colorEnd
 * @returns {Array.<Array.<number, number, number>>}
 */
function _blendPalette(rgbFactor, colorStart, colorEnd) {
  const TOTAL = BLENDED_COLOR_AFTER_START_COLOR_INDEX + 2;
  const palette = new Array(TOTAL);

  palette[0] = [...colorStart];
  palette[TOTAL - 1] = [...colorEnd];

  for (let step = 1; step < TOTAL; step++) {
    const r = Math.round(colorStart[0] + rgbFactor[0] * step);
    const g = Math.round(colorStart[1] + rgbFactor[1] * step);
    const b = Math.round(colorStart[2] + rgbFactor[2] * step);
    palette[step] = [r, g, b];
  }

  return palette;
}

/**
 * @param {Array.<number, number, number>} colorStart
 * @param {Array.<number, number, number>} colorEnd
 * @returns {Array.<Array.<number, number, number>>}
 */
function generatePalette(colorStart, colorEnd) {
  const rgbFactor = _calculateRgbFactors(colorStart, colorEnd);
  return _blendPalette(rgbFactor, colorStart, colorEnd);
}

/**
 * @param {Array.<number, number, number>} colorStart
 * @param {Array.<number, number, number>} colorEnd
 * @returns {Array.<number, number, number>}
 */
function getPlayerBackgroundRgb(colorStart, colorEnd) {
  if (!colorStart || !colorEnd) {
    return;
  }

  const palette = generatePalette(colorStart, colorEnd);
  return palette[BLENDED_COLOR_AFTER_START_COLOR_INDEX];
}

/**
 * @param {Array.<number, number, number>} backColor
 * @param {Array.<number, number, number>} textColor
 * @returns {boolean}
 */
function hasMinimumContrast(backColor, textColor) {
  return _contrast(backColor, textColor) > CONTRAST_MIN_RATIO;
}

/**
 * @param {Array.<number, number, number>} baseColor
 * @param {Array.<number, number, number>} contrastColor1
 * @param {Array.<number, number, number>} contrastColor2
 * @returns {boolean}
 */
function sortByHighToLowContrast(baseColor, contrastColor1, contrastColor2) {
  const contrast1 = _contrast([...baseColor], [...contrastColor1]);
  const contrast2 = _contrast([...baseColor], [...contrastColor2]);

  return contrast1 > contrast2;
}

/**
 * @param {Array.<number, number, number>} baseColor
 * @param {Array.<number, number, number>} contrastColor1
 * @param {Array.<number, number, number>} contrastColor2
 * @returns {Array.<number, number, number>}
 */
function highestContrast(baseColor, contrastColor1, contrastColor2) {
  return sortByHighToLowContrast(baseColor, contrastColor1, contrastColor2)
    ? contrastColor1
    : contrastColor2;
}

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
function rgbToHex(r, g, b) {
  return '#' + _decimalToHex(r) + _decimalToHex(g) + _decimalToHex(b);
}

/**
 * @param {string} hex
 * @returns {Array.<number, number, number>}
 */
function hexToRgb(hex) {
  const regexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return regexResult
    ? [parseInt(regexResult[1], 16), parseInt(regexResult[2], 16), parseInt(regexResult[3], 16)]
    : null;
}

/**
 * @param {Array.<number, number, number>} rgb
 * @param {number} percent
 * @returns
 */
function lightenDarkenColor(rgb, percent) {
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];

  r = (r * (100 + percent)) / 100;
  g = (g * (100 + percent)) / 100;
  b = (b * (100 + percent)) / 100;

  r = r < 255 ? r : 255;
  g = g < 255 ? g : 255;
  b = b < 255 ? b : 255;

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return [r, g, b];
}

export {
  _luminance,
  _decimalToHex,
  _contrast,
  _calculateRgbFactors,
  _blendPalette,
  DEFAULT_BACKGROUND_RGB,
  DEFAULT_TEXT_RGB,
  DEFAULT_BACKGROUND_ELEVATED_RGB,
  DEFAULT_BACKGROUND_HIGHLIGHT_RGB,
  DARKER_FACTOR,
  generatePalette,
  getPlayerBackgroundRgb,
  hasMinimumContrast,
  sortByHighToLowContrast,
  highestContrast,
  hexToRgb,
  rgbToHex,
  lightenDarkenColor,
};
