function onClick(node, callback) {
  function myEvent(e) {
    e.stopPropagation();
    e.preventDefault();
    callback();
  }

  node.addEventListener('click', myEvent);

  return {
    destroy() {
      node.removeEventListener('click', myEvent);
    },
  };
}

function onTap(node, callback) {
  function myEvent(e) {
    e.stopPropagation();
    e.preventDefault();
    callback();
  }

  node.addEventListener('click', myEvent);
  node.addEventListener('keydown', myEvent);

  return {
    destroy() {
      node.removeEventListener('click', myEvent);
      node.removeEventListener('keydown', myEvent);
    },
  };
}

export { onClick, onTap };
