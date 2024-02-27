<script>
  export let callback;

  /** @type {HTMLElement} */
  let END_HTML;

  function observeEnd(node) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback?.();
        }
      });
    });
    observer.observe(node);
    return {
      destroy: () => observer.disconnect(),
    };
  }
</script>

<div class="scroll-end-detector" bind:this={END_HTML} use:observeEnd>&nbsp;</div>
