import { expect, test, vi } from 'vitest';
import { get } from 'svelte/store';
import { initSpotifyApi } from './init-test'; // 🔴 it has to be among 1st import

import { accessToken } from '@/js/store';
import SpotifyApi from '@/js/SpotifyApi';

import CURRENT_USER_JSON from './data/current-user.json';
import PLAYBACK_STATE_JSON from './data/playback-state.json';
import AVAILABLE_DEVICES_JSON from './data/available-devices.json';
import MY_PLAYLISTS_JSON from './data/my-playlists.json';
import MY_PLAYLISTS_SORTED_ALPHABETICALLY_JSON from './data/my-playlists-sorted-alphabetically.json';
import LIKED_SONGS_JSON from './data/liked-songs.json';
import MY_ALBUMS_JSON from './data/my-albums.json';
import RECENTLY_PLAYED_JSON from './data/recently-played.json';
import LAST_SONG_JSON from './data/last-song.json';
import QUEUE_JSON from './data/queue.json';
import QUEUE_LAST_SONG_JSON from './data/queue-last-song.json';
import PLAYER_STATE_JSON from './data/player-state.json';
import PLAYER_STATE_API_JSON from './api/player-state-api.json';

initSpotifyApi();

test(`goToAuthorizeUrl() redirect to a generated a sportify-authorization-url"`, async () => {
  SpotifyApi.goToAuthorizeUrl();
  expect(window.location.href).toEqual(
    'https://accounts.spotify.com/authorize?response_type=code&client_id=be4ae675c4e84eae88327846078637a7&scope=streaming%20user-modify-playback-state%20user-read-currently-playing%20user-read-private%20user-read-email%20user-library-read%20playlist-read-private%20user-read-recently-played%20playlist-read-collaborative%20user-read-playback-state&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fspotify-tokens%2F',
  );
});

test(`forceAuthorization() to clear localStorage & redirect"`, async () => {
  const clearSpy = vi.spyOn(Storage.prototype, 'clear');
  await SpotifyApi.forceAuthorization();

  // test localStorage.clear
  expect(clearSpy).toHaveBeenCalledOnce();

  // test redirect to "/"
  const match = window.location.href.match(/(https?):\/\/(www\.)?([^/]+)(\/.*)/);
  const path = match[4];
  expect(path).toEqual('/');
});

test(`initAccessToken set access_token in store and change url to "/"`, async () => {
  const pushStateSpy = vi.spyOn(window.history, 'pushState');

  window.location.href = '/spotify-tokens/?code=AQBxGP9Zt32';
  await SpotifyApi.initAccessToken();

  // test store value access_token
  expect(get(accessToken)).toEqual(
    'BQD2Wg2mWl1EiTEG9kwkwK1jZgJU-Ytd2cyXpRjm3CS4Je71lEAZfxCF2zkWjdAXFricABDPbB2Ap_dtA-A_CVz5JW-pV9MQerAejAhpkjDCYK0fDEDDnHUag34D7TVeCTXLcP29caaXD90lXSOO0-IR5zylPfAMbObDK9gmYc1E0056SHe-pqmIubWPs_lFdctbjGA4wYhYErMjheW56hZ55jwFddzs1bnsUw',
  );

  // test change url
  expect(pushStateSpy).toHaveBeenLastCalledWith({}, 'token ok', '/');
});

test(`/me returns SpotifyUser`, async () => {
  const actual = await SpotifyApi.me();
  const expected = { ...CURRENT_USER_JSON };

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player returns SpotifyPlaybackState`, async () => {
  const actual = await SpotifyApi.getPlaybackState();
  const expected = { ...PLAYBACK_STATE_JSON };

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/devices returns SpotifyDeviceList`, async () => {
  const actual = await SpotifyApi.getAvailableDevice();
  const expected = [...AVAILABLE_DEVICES_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/users/laosoupi59/playlists returns SpotifyPlaylist[]`, async () => {
  const actual = await SpotifyApi.getPlaylists('laosoupi59');
  const expected = [...MY_PLAYLISTS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getPlaylistsSortedAlphabetically() returns SpotifyPlaylist[] sorted alphabetically`, async () => {
  const actual = await SpotifyApi.getPlaylistsSortedAlphabetically('laosoupi59');
  const expected = [...MY_PLAYLISTS_SORTED_ALPHABETICALLY_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getLikedTracks() returns SpotifyTrack[] sorted by added_at`, async () => {
  const actual = await SpotifyApi.getLikedTracks();
  const expected = [...LIKED_SONGS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/albums returns SpotifyAlbum[]`, async () => {
  const actual = await SpotifyApi.getMyAlbums();
  const expected = [...MY_ALBUMS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/recently-played returns SpotifySong[]`, async () => {
  const actual = await SpotifyApi.getRecentlyPlayedSongs();
  const expected = [...RECENTLY_PLAYED_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/queue returns SpotifyQueue`, async () => {
  const actual = await SpotifyApi.getQueue();
  const expected = { ...QUEUE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getQueueLastSong() returns SpotifyTrack`, async () => {
  const actual = await SpotifyApi.getQueueLastSong();
  const expected = { ...QUEUE_LAST_SONG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`get last recently-played-songs returns SpotifySong`, async () => {
  const songs = await SpotifyApi.getRecentlyPlayedSongs();
  const actual = songs[0];
  const expected = { ...LAST_SONG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`extractPlayerStateFrom(playerStateApi) returns SpotifyPlayerState`, async () => {
  const actual = await SpotifyApi.extractPlayerStateFrom({ ...PLAYER_STATE_API_JSON });
  const expected = { ...PLAYER_STATE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`transfertPlayback() not throwing exception`, async () => {
  await SpotifyApi.transfertPlayback('my-device-id-123');
});

test(`transfertPlayback() not throwing exception`, async () => {
  await SpotifyApi.transfertPlayback('my-device-id-123');
});
