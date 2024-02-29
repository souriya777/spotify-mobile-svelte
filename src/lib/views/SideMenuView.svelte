<script>
  import { isSideMenuVisible } from '@js/store';
  import { onTap } from '@js/event-utils';
  import ViewRoot from '@lib/views/ViewRoot.svelte';
  import Showcase from '@lib/Showcase.svelte';
  import SpotifyApi from '@js/SpotifyApi';

  function observeVisible(node) {
    const observer = new IntersectionObserver(
      (entries) => {
        isSideMenuVisible.set(entries[0].isIntersecting);
      },
      { threshold: [0] },
    );
    observer.observe(node);
    return {
      destroy: () => observer.disconnect(),
    };
  }
</script>

<ViewRoot>
  <div class="side-menu" class:visible={$isSideMenuVisible} use:observeVisible>
    <Showcase />
    <button use:onTap={SpotifyApi.forceAuthorization}>🗑️ FORCE</button>
  </div>
</ViewRoot>
