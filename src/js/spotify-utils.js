const SPOTIFY_LIKED_IMAGES_API = [
  {
    url: '/liked-songs-64.png',
    height: 64,
    width: 64,
  },
  {
    url: '/liked-songs-300.png',
    height: 300,
    width: 300,
  },
];
const SPOTIFY_FIRST_RESULTS_LIMIT = 4;
const SUGGESTIONS_MAX = 4;
const SUGGESTIONS_MAX_BY_CATEGORY = 2;
const OFFSET_INCREMENT = 3;

const sortListByName = (a, b) => a.name.localeCompare(b.name);

const sortListByNameReverse = (a, b) => b.name.localeCompare(a.name);

const sortListByAddedAt = (a, b) => b.added_at - a.added_at;

const sortListByAddedAtDesc = (a, b) => a.added_at - b.added_at;

const sortPlayListByCreator = (a, b) =>
  a?.owner?.display_name?.localeCompare(b?.owner?.display_name);

const sortPlayListByCreatorReverse = (a, b) =>
  b?.owner?.display_name?.localeCompare(a?.owner?.display_name);

const sortAlbumtByCreator = (a, b) =>
  a?.artists?.at(0)?.name?.localeCompare(b?.artists?.at(0)?.name);

const sortAlbumtByCreatorReverse = (a, b) =>
  b?.artists?.at(0)?.name?.localeCompare(a?.artists?.at(0)?.name);

function sortImagesBySizeAsc(images) {
  return images?.sort((a, b) => a.width - b.width);
}

/**
 * @param {string} searchQuery
 * @param {import('@js/spotify').SpotifySearch} spotifySearch
 * @returns {string[]}
 */
function extractSuggestionsFromSpotifySearch(searchQuery, spotifySearch) {
  const result = [];

  if (!searchQuery || !spotifySearch) {
    return result;
  }

  const tracks = spotifySearch?.tracks ? spotifySearch.tracks : [];
  const artists = spotifySearch?.artists ? spotifySearch.artists : [];
  const playlists = spotifySearch?.playlists ? spotifySearch.playlists : [];
  let uniqueNames = new Set();

  const containsName = (item) => {
    const name = item?.name?.toLocaleLowerCase();
    const found = name?.includes(searchQuery?.toLocaleLowerCase());

    if (found && !uniqueNames.has(name)) {
      uniqueNames.add(name);
      return true;
    }
    return false;
  };

  const exactTracks = tracks.filter(containsName).map((item) => item?.name);
  const exactArtists = artists.filter(containsName).map((item) => item?.name);
  const exactPlaylists = playlists.filter(containsName).map((item) => item?.name);

  // MAX 2 SONGS + MAX 2 ARTISTS
  result.push(...exactTracks.slice(0, SUGGESTIONS_MAX_BY_CATEGORY));
  result.push(...exactArtists.slice(0, SUGGESTIONS_MAX_BY_CATEGORY));

  // MAX 1 PLAYLIST
  if (result.length < SUGGESTIONS_MAX) {
    result.push(...exactPlaylists.slice(0, 1));
  }

  // IF NO RESULT, try fill it !!!
  if (result.length < SUGGESTIONS_MAX) {
    result.push(...exactTracks.slice(result.length, SUGGESTIONS_MAX));
  }

  if (result.length < SUGGESTIONS_MAX) {
    result.push(...exactArtists.slice(result.length, SUGGESTIONS_MAX));
  }

  if (result.length < SUGGESTIONS_MAX) {
    result.push(...exactPlaylists.slice(result.length, SUGGESTIONS_MAX));
  }

  return result;
}

export {
  SPOTIFY_LIKED_IMAGES_API,
  SPOTIFY_FIRST_RESULTS_LIMIT,
  OFFSET_INCREMENT,
  sortListByName,
  sortListByNameReverse,
  sortListByAddedAt,
  sortListByAddedAtDesc,
  sortPlayListByCreator,
  sortPlayListByCreatorReverse,
  sortAlbumtByCreator,
  sortAlbumtByCreatorReverse,
  sortImagesBySizeAsc,
  extractSuggestionsFromSpotifySearch,
};
