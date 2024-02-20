<script>
  import { createEventDispatcher } from 'svelte';
  import { previousSearchQuery, searchQuery } from '@js/store';
  import { debounce } from '@js/souriya-utils';
  import { isEmpty } from '@js/string-utils';
  import SpotifyApi from '@js/SpotifyApi';
  import Svg from '@lib/svg/Svg.svelte';

  export let focused;

  const DEBOUNCE_SEARCH_MS = 750;
  const dispatch = createEventDispatcher();

  let value = '';

  function search() {
    if (isEmpty(value)) {
      return;
    }

    $searchQuery = value;

    debounce(async () => {
      previousSearchQuery.update((arr) => [...arr, value]);
      SpotifyApi.search(value).then((result) => console.log(result));
    }, DEBOUNCE_SEARCH_MS);
  }

  function cancel() {
    value = '';
    dispatch('cancel');
  }
</script>

<div class="search-input" class:focused>
  <div class="icon">
    <Svg name="loupe" />
  </div>
  <input
    type="text"
    placeholder="What do you want to listen to?"
    class:font-search-input-focus={focused}
    bind:value
    on:input={search}
    on:focus
  />
  <button on:click={cancel}>Cancel</button>
</div>

<style>
  .search-input {
    display: flex;
    align-items: center;
    color: var(--color-primary);
    height: 4.4rem;
  }

  input,
  .icon {
    height: 100%;
    border-radius: 0.4rem;
  }

  .icon {
    display: flex;
    align-items: center;
    padding-inline: 1.4rem 1rem;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    background-color: var(--color-secondary);
  }

  input {
    width: 100%;
    border: none;
    border-top-left-radius: unset;
    border-bottom-left-radius: unset;
    caret-color: transparent;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: inherit;
  }

  button {
    margin-inline-start: 1.4rem;
    border: none;
    background: transparent;
    color: var(--color-secondary);
    display: none;
  }

  .focused {
    height: 3.2rem;
  }

  .focused .icon {
    padding-inline: 0.4rem;
    background-color: var(--color-primary-highlight);
    color: var(--color-on-primary-highlight);
  }

  :global(.search-input .focused .icon svg) {
    height: 1.8rem;
  }

  .focused input {
    background-color: var(--color-primary-highlight);
    color: var(--color-secondary);
    caret-color: var(--color-accent);
  }

  .focused input::placeholder {
    color: var(--color-tertiary);
  }

  .focused button {
    display: block;
  }
</style>
