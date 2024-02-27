import { get } from 'svelte/store';
import { myLibRecentlyPlayed, myLibPlaylists, myLibAlbums, myLibArtists, userId } from '@js/store';
import SpotifyApi from '@js/SpotifyApi';

function sortMyLibBySpotify() {
  sortRecentlyBySpotify();
  sortPlaylistsBySpotify();
  sortAlbumsBySpotify();
  sortArtistsBySpotify();
}

function sortMyLibAlphabetically(reverse = false) {
  sortRecentlyAlphabetically(reverse);
  sortPlaylistsAlphabetically(reverse);
  sortAlbumsAlphabetically(reverse);
  sortArtistsAlphabetically(reverse);
}

async function sortRecentlyBySpotify() {
  const items = await SpotifyApi.getMyLibRecentlyPlayed();
  myLibRecentlyPlayed.set(items);
}

async function sortPlaylistsBySpotify() {
  const items = await SpotifyApi.getPlaylistsSortedBySpotify(get(userId));
  myLibPlaylists.set(items);
}

async function sortRecentlyAlphabetically(reverse = false) {
  const items = await SpotifyApi.getMyLibRecentlyPlayedSortedAlphabetically(reverse);
  myLibRecentlyPlayed.set(items);
}

async function sortPlaylistsAlphabetically(reverse = false) {
  const items = await SpotifyApi.getPlaylistsSortedAlphabetically(get(userId), reverse);
  myLibPlaylists.set(items);
}

async function sortPlaylistsByCreator(reverse = false) {
  const items = await SpotifyApi.getPlaylistsSortedByCreator(get(userId), reverse);
  myLibPlaylists.set(items);
}

async function sortAlbumsBySpotify() {
  const items = await SpotifyApi.getMySavedAlbumsSortedRecentlyPlayed();
  myLibAlbums.set(items);
}

async function sortAlbumsAlphabetically(reverse = false) {
  const items = await SpotifyApi.getAlbumsSortedAlphabetically(reverse);
  myLibAlbums.set(items);
}

async function sortAlbumsByCreator(reverse = false) {
  const items = await SpotifyApi.getAlbumsSortedByCreator(reverse);
  myLibAlbums.set(items);
}

async function sortArtistsBySpotify() {
  const items = await SpotifyApi.getMyFollowedArtists();
  myLibArtists.set(items);
}

async function sortArtistsAlphabetically(reverse = false) {
  const items = await SpotifyApi.getMyFollowedArtistsSortedAlphabetically(reverse);
  myLibArtists.set(items);
}

// spotify API returns incoherent result ?
// because it use the private API
// async function sortPlaylistRecentlyAddedAt() {
// $myLibPlaylists = await SpotifyApi.getPlaylistsSortedAddedAtFIXME($userId);
// }

// spotify API returns incoherent result ?
// async function sortAlbumsRecentlyAdded() {
//   SpotifyApi.getMySavedAlbumsSortedRecentlyAdded().then((items) => ($myLibAlbums = items));
// }

export {
  sortMyLibBySpotify,
  sortMyLibAlphabetically,
  sortPlaylistsBySpotify,
  sortPlaylistsAlphabetically,
  sortPlaylistsByCreator,
  sortAlbumsBySpotify,
  sortAlbumsAlphabetically,
  sortAlbumsByCreator,
  sortArtistsBySpotify,
  sortArtistsAlphabetically,
};
