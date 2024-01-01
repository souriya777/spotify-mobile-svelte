function isHomePath(path) {
  return /^\/$/gi.test(path);
}

function isSearchPath(path) {
  return /search/gi.test(path);
}

function isMyLibPath(path) {
  return /my-lib/gi.test(path);
}

export { isHomePath, isSearchPath, isMyLibPath };
