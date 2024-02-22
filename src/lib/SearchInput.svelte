<script>
  import { createEventDispatcher } from 'svelte';
  import { searchQuery } from '@js/store';
  import { debounce } from '@js/souriya-utils';
  import { isEmpty } from '@js/string-utils';
  import Svg from '@lib/svg/Svg.svelte';

  export let focused;

  const DEBOUNCE_SEARCH_MS = 750;
  const dispatch = createEventDispatcher();

  /** @type {HTMLElement} */
  let INPUT_HTML;
  let value = $searchQuery ? $searchQuery : '';

  $: if (focused === true && INPUT_HTML) {
    INPUT_HTML.focus();
  }

  function search() {
    if (isEmpty(value)) {
      return;
    }

    debounce(async () => {
      $searchQuery = value;
    }, DEBOUNCE_SEARCH_MS);
  }

  function cancel() {
    value = '';
    dispatch('cancel');
  }
</script>

<div class="search-input" class:focused>
  <div class="input-container">
    <div class="icon">
      <Svg name="loupe" />
    </div>
    <input
      type="text"
      placeholder="What do you want to listen to?"
      class:font-search-input-focus={focused}
      bind:value
      bind:this={INPUT_HTML}
      on:input={search}
      on:focus
    />
    <button on:click={cancel}>Cancel</button>
  </div>
</div>

<style>
  .input-container {
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
    margin-inline: calc(-1 * var(--padding-inline-view-content));
    padding-block: 1rem 0.8rem;
    padding-inline: var(--padding-inline-view-content);
    background-color: var(--color-primary-highlight);
  }

  .focused .input-container {
    height: 3.2rem;
  }

  .focused .icon {
    padding-inline: 0.4rem;
    background-color: var(--color-primary-elevated);
    color: var(--color-on-primary-elevated);
  }

  :global(.search-input.focused .icon svg) {
    height: 1.8rem;
  }

  .focused input {
    background-color: var(--color-primary-elevated);
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
