'use strict';

function getDevice() {
  const device = navigator.userAgent?.match(/\((\w)*/)?.[0]?.slice(1);
  const browser = navigator.userAgent?.match(/(chrome|firefox|safari)+/gi)?.[0];

  return `${device}.${browser}`;
}

export { getDevice };
