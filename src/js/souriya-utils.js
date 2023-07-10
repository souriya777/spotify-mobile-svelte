'use strict';

const NAME_REGEX = /^[a-zA-Z\u00C0-\u00D6\u00D9-\u00F6\u00F9-\u00FF ,.'-]+$/;

const BIRTHDAY_REGEX = /^(?:19|20)\d\d-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])$/;

let HTML_ELEMENT = document.getElementsByTagName('html')[0];
let DATE_TIME_FORMAT = null;
let debounceTimer;
let throttlePause;

function debounce(callback, time = 300) {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
}

function throttle(callback, time = 300) {
  if (throttlePause) return;

  throttlePause = true;
  callback();

  setTimeout(() => {
    throttlePause = false;
  }, time);
}

function noScroll(classname = 'no--scroll') {
  HTML_ELEMENT.classList.add(classname);
}

function scroll(classname = 'no--scroll') {
  HTML_ELEMENT.classList.remove(classname);
}

function observeElementScrolled(elementToObserve, elementToAddClass, theClass, threshold) {
  const OBSERVER = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting === true) {
        elementToAddClass.classList.remove(theClass);
      } else {
        elementToAddClass.classList.add(theClass);
      }
    },
    { threshold: [threshold] }
  );

  OBSERVER.observe(elementToObserve);
}

function decodeHtml(html) {
  let txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function hourMinute(timeInMillis) {
  if (!DATE_TIME_FORMAT) {
    DATE_TIME_FORMAT = new Intl.DateTimeFormat('fr-FR', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return DATE_TIME_FORMAT.format(timeInMillis);
}

export {
  NAME_REGEX,
  BIRTHDAY_REGEX,
  debounce,
  throttle,
  scroll,
  noScroll,
  decodeHtml,
  observeElementScrolled,
  hourMinute,
};
