const DEVICE_NAME = navigator.userAgent?.match(/\((\w)*/)?.[0]?.slice(1);
const BROWSER = navigator.userAgent?.match(/(chrome|firefox|safari)+/gi)?.[0];

const BROWSER_DEVICE = `${DEVICE_NAME?.slice(0, 3)}.${BROWSER}`.toLowerCase();

function isBrowserSupportTouchEvents() {
  return (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0
  );
}

function getTranslateXY(element) {
  if (!element) {
    return {
      translateX: 0,
      translateY: 0,
    };
  }

  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
  };
}

export { BROWSER_DEVICE, isBrowserSupportTouchEvents, getTranslateXY };
