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
 * @param {number} progressMs
 * @param {number} durationMs
 * @returns {number}
 */
function progressPercent(progressMs, durationMs) {
  if (isNaN(progressMs) || isNaN(durationMs) || durationMs === 0) {
    return 0;
  }

  return (progressMs / durationMs) * 100;
}

/**
 * @param {number} progressMs
 * @param {number} durationMs
 * @returns {number}
 */
function progressPercentInteger(progressMs, durationMs) {
  return Math.trunc(progressPercent(progressMs, durationMs));
}

/**
 * @param {number} percent
 * @param {number} durationMillis
 * @returns {number}
 */
function percentToMillis(percent, durationMillis) {
  return (percent * durationMillis) / 100;
}

function areTimestampsSeparateBy(initialTimestamp, currentTimestamp, minGapMillis) {
  return !initialTimestamp || currentTimestamp - initialTimestamp >= minGapMillis;
}

export {
  millisToMinuteSecond,
  progressPercent,
  progressPercentInteger,
  percentToMillis,
  areTimestampsSeparateBy,
};
