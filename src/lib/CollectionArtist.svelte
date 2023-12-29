<script>
  import Collection from '@lib/Collection.svelte';
  import CollectionItem from '@lib/CollectionItem.svelte';
  /** @type {import('@js/spotify').SpotifySearchArtist[]} */
  export let items;
</script>

<Collection>
  {#each items as artist}
    <li class="spotify-list-artist-item">
      <CollectionItem images={artist?.images} title={artist?.name} isArtist={true} />
    </li>
  {/each}
</Collection>

<style>
  :global(.spotify-list-artist-item img) {
    border-radius: 50%;
  }
</style>
