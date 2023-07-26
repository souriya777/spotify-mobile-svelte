function onTap(node, callback) {
  function myEvent(e) {
    e.stopPropagation();
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

export { onTap };
