<script>
  import { selectedPlaylistId } from '@/js/store';

  /** @type {import('@/js/spotify').SpotifyPlaylist[]} */
  export let items;

  $: if (items?.[0]?.id) {
    selectedPlaylistId.set(items[0].id);
  }

  let selected;

  function updateSelectedId(e) {
    selectedPlaylistId.set(e.target.value);
  }
</script>

selectedPlaylistId:{$selectedPlaylistId}
<select bind:value={selected} on:change={updateSelectedId}>
  {#each items as list}
    <option value={list?.id}>
      {#if $selectedPlaylistId === list?.id}
        ➡️
      {/if}
      {list?.name}
    </option>
  {/each}
</select>
