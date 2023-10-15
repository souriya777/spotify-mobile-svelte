<script>
  import Collection from '@/lib/Collection.svelte';
  import CollectionItem from '@/lib/CollectionItem.svelte';
  /** @type {import('@/js/spotify').SpotifySearchArtist[]} */
  export let items;
</script>

<Collection>
  {#each items as artist}
    {@const image = artist?.images?.at(-1)}

    <li class="spotify-list-artist-item">
      <CollectionItem
        imgUrl={image?.url}
        imgHeight={image?.height}
        imgWidth={image?.width}
        imgAlt={artist?.name}
        title={artist?.name}
      />
    </li>
  {/each}
</Collection>

<style>
  :global(.spotify-list-artist-item img) {
    border-radius: 50%;
  }
</style>
