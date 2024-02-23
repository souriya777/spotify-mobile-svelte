<script>
  import { fade } from 'svelte/transition';
  import { recentSearch, searchQuery } from '@js/store';
  import { isEmpty } from '@js/string-utils';
  import ListAll from '@lib/ListAll.svelte';

  export let isInputFocused;

  $: hasRecentSearch = $recentSearch?.length > 0;
  $: canShowRecentSearch = isInputFocused && isEmpty($searchQuery) && hasRecentSearch;

  function clearRecentSearch() {
    $recentSearch = [];
  }
</script>

{#if canShowRecentSearch}
  <div class="recent-search" transition:fade={{ delay: 250, duration: 0.1 }}>
    <p class="font-recent-search">Recent searches</p>
    <ListAll items={$recentSearch} hasPrefix={true} hasClear={true} />

    {#if hasRecentSearch}
      <div class="clear font-recent-search-clear">
        <button on:click={clearRecentSearch}>Clear recent searches</button>
      </div>
    {/if}
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
</style>
