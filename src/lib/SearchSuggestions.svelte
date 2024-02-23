<script>
  import { searchQuery } from '@js/store';
  import Svg from '@lib/svg/Svg.svelte';

  /** @type {string[]} */
  export let suggestions;
</script>

<ul>
  {#each suggestions as suggestion}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={() => ($searchQuery = suggestion)}>
      <Svg name="loupe" size={16} />
      <div class="text">
        {suggestion}
      </div>
    </li>
  {/each}
</ul>

<style>
  li {
    display: flex;
    align-items: center;
  }

  .text {
    margin-inline-start: 1.2rem;
    margin-block: 1rem;
  }
</style>
