'use strict';

const DEVICE_NAME = navigator.userAgent?.match(/\((\w)*/)?.[0]?.slice(1);
const BROWSER = navigator.userAgent?.match(/(chrome|firefox|safari)+/gi)?.[0];

const BROWSER_DEVICE = `${DEVICE_NAME}.${BROWSER}`;

export { BROWSER_DEVICE };
