<script>
  export let callback;

  /** @type {HTMLElement} */
  let END_HTML;

  function detectEnd(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback?.();
      }
    });
  }

  function observeEnd(node) {
    const observer = new IntersectionObserver(detectEnd);
    observer.observe(node);
    return {
      destroy: () => observer.disconnect(),
    };
  }
</script>

<div class="scroll-end-detector" bind:this={END_HTML} use:observeEnd>&nbsp;</div>
