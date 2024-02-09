const sortListByName = (a, b) => a.name.localeCompare(b.name);

const sortListByAddedAt = (a, b) => b.added_at - a.added_at;

const sortListByAddedAtDesc = (a, b) => a.added_at - b.added_at;

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

export {
  sortListByName,
  sortListByAddedAt,
  sortListByAddedAtDesc,
  sortImagesBySizeAsc,
  SPOTIFY_LIKED_IMAGES_API,
  SPOTIFY_FIRST_RESULTS_LIMIT,
};
