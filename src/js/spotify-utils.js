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

const SPOTIFY_FIRST_RESULTS_LIMIT = 3;
const SPOTIFY_SECOND_RESULTS_LIMIT = 2;

export {
  sortListByName,
  sortListByNameReverse,
  sortListByAddedAt,
  sortListByAddedAtDesc,
  sortPlayListByCreator,
  sortPlayListByCreatorReverse,
  sortAlbumtByCreator,
  sortAlbumtByCreatorReverse,
  sortImagesBySizeAsc,
  SPOTIFY_LIKED_IMAGES_API,
  SPOTIFY_FIRST_RESULTS_LIMIT,
  SPOTIFY_SECOND_RESULTS_LIMIT,
};
