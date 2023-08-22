<script>
  import { AXIOS_INSTANCE } from '@/js/axios-utils';
  import Logger from '@/js/Logger';

  const LOGGER = Logger.getNewInstance('SpotifyMyAlbums.svelte');

  const ALBUM_LIMIT = 50;

  async function getMyAlbums(offset) {
    let url = `/me/albums?limit=${ALBUM_LIMIT}`;

    LOGGER.log('', offset);

    // if (offset) {
    //   url += `&offset=${offset}`;
    // }

    const result = await AXIOS_INSTANCE.get(url);

    // just for log
    LOGGER.log('', result?.data?.items);

    // return result?.data?.items?.map(({ album }) =>
    //   AlbumNormalizer.normalize(album)
    // );
  }
</script>

<button on:click={getMyAlbums}>my albums</button>
