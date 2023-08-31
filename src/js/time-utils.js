/**
 * @param {number} timeInMillis
 * @returns {string}
 */
function millisToMinuteSecond(timeInMillis) {
  const minutes = Math.trunc(timeInMillis / 60 / 1000);
  const leftMillis = timeInMillis - minutes * 60 * 1000;
  let seconds = Math.trunc(leftMillis / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * @param {number} percent
 * @param {number} durationMillis
 * @returns {number}
 */
function percentToMillis(percent, durationMillis) {
  return (percent * durationMillis) / 100;
}

export { millisToMinuteSecond, percentToMillis };
