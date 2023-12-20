function isEmpty(str) {
  return !isNotEmpty(str);
}

function isNotEmpty(str) {
  return str !== null && str !== undefined && typeof str === 'string' && str.trim().length > 0;
}

export { isEmpty, isNotEmpty };
