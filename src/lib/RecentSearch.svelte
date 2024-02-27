<script>
  import { fade } from 'svelte/transition';
  import { searchFullMode, searchRecent, searchQuery } from '@js/store';
  import { onTap } from '@js/event-utils';
  import { isEmpty } from '@js/string-utils';
  import ListAll from '@lib/ListAll.svelte';

  $: hasRecentSearch = $searchRecent?.length > 0;
  $: canShowRecentSearch = hasRecentSearch && $searchFullMode && isEmpty($searchQuery);

  function clearRecentSearch() {
    $searchRecent = [];
  }
</script>

{#if canShowRecentSearch}
  <div class="recent-search" transition:fade={{ delay: 250, duration: 0.1 }}>
    <p class="font-bold font-1_8">Recent searches</p>
    <ListAll items={$searchRecent} hasPrefix={true} hasClear={true} />

    {#if hasRecentSearch}
      <div class="clear font-1_3 font-bold">
        <button use:onTap={clearRecentSearch}>Clear recent searches</button>
      </div>
    {/if}
  </div>
{:else if isEmpty($searchQuery)}
  <div class="no-recent">
    <p class="font-2_4 font-bold">Play what you love</p>
    <p class="font-1_3">Search for artists, songs, albums and more.</p>
  </div>
{/if}

<style>
  .clear {
    display: flex;
    justify-content: center;
    padding-block-start: 2rem;
  }

  button {
    padding-inline: 1.6rem;
    padding-block: 0.9rem 0.5rem;
    border: 0.1rem solid var(--color-tertiary);
    border-radius: 2rem;
    background: none;
    color: var(--color-secondary);
  }

  .no-recent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50dvh;
  }
</style>
