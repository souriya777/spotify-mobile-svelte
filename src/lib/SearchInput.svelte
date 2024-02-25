<script>
  import { createEventDispatcher } from 'svelte';
  import { isNotEmpty } from '@js/string-utils';
  import { searchQuery } from '@js/store';
  import { debounce } from '@js/souriya-utils';
  import Svg from '@lib/svg/Svg.svelte';

  export let focused;
  export const focusForMe = () => {
    INPUT_HTML?.focus();
  };

  const DEBOUNCE_SEARCH_MS = 750;
  const dispatch = createEventDispatcher();

  /** @type {HTMLElement} */
  let INPUT_HTML;

  $: if (focused) {
    INPUT_HTML?.focus();
  }

  function search() {
    debounce(async () => {
      dispatch('valid');
    }, DEBOUNCE_SEARCH_MS);
  }

  function focus() {
    dispatch('focus');
  }

  function cancel() {
    dispatch('cancel');
  }

  function clear() {
    $searchQuery = '';
    INPUT_HTML?.focus();
  }
</script>

<div class="search-input" class:focused>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="input-container" on:click={focus}>
    <div class="icon begin">
      <Svg name="loupe" />
    </div>
    <input
      type="text"
      placeholder="What do you want to listen to?"
      class:font-search-input-focus={focused}
      bind:value={$searchQuery}
      bind:this={INPUT_HTML}
      on:input={search}
      on:focus
    />
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="icon end" on:click={clear}>
      {#if isNotEmpty($searchQuery)}
        <Svg name="cross" />
      {/if}
    </div>
  </div>

  <button class="font-search-cancel" on:click={cancel}>Cancel</button>
</div>

<style>
  .search-input {
    display: flex;
  }

  .input-container {
    display: flex;
    flex-grow: 1;
    align-items: center;
    color: var(--color-primary);
    height: 4.4rem;
  }

  .icon {
    display: flex;
    align-items: center;
    padding-inline: 1.4rem 1rem;
    border-radius: 0.4rem;
    background-color: var(--color-secondary);
  }

  .icon.begin {
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
  }

  .icon.end {
    border-top-left-radius: unset;
    border-bottom-left-radius: unset;
  }

  input {
    width: 100%;
    border: none;
    border-radius: 0;
    caret-color: transparent;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: inherit;
  }

  input,
  .icon {
    height: 100%;
  }

  button {
    margin-inline-start: 1.4rem;
    padding-inline: unset;
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
