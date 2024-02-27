<script>
  import { searchQuery } from '@js/store';
  import { onTap } from '@js/event-utils';
  import Svg from '@lib/svg/Svg.svelte';

  /** @type {string[]} */
  export let suggestions;

  $: splitSuggestions = suggestions
    ?.map((suggestion) => {
      const index = suggestion.toLowerCase().indexOf($searchQuery.toLowerCase());

      if (index !== -1) {
        let begin = suggestion.slice(0, index);
        let end = suggestion.slice(index + $searchQuery.length);
        return { suggestion, begin, end };
      }

      return null;
    })
    .filter((item) => item !== null);

  function updateSuggestion(suggestion) {
    $searchQuery = suggestion;
  }
</script>

<ul>
  {#each splitSuggestions as { suggestion, begin, end }}
    <li use:onTap={() => updateSuggestion(suggestion)}>
      <div class="icon">
        <Svg name="loupe" size={16} />
      </div>
      <div class="text one-row">
        {begin}<span class="token">{$searchQuery}</span>{end}
      </div>
    </li>
  {/each}
</ul>

<style>
  li {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-inline-end: 1.2rem;
  }

  .text {
    margin-block: 1rem;
    text-transform: lowercase;
  }

  .token {
    color: var(--color-tertiary);
  }
</style>
