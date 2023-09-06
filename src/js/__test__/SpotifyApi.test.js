import { expect, test, vi } from 'vitest';
import { initSpotifyApi } from './init-test'; // 🔴 it has to be among 1st import

import SpotifyApi from '@/js/SpotifyApi';

import CURRENT_USER_JSON from './data/current-user.json';
import PLAYBACK_STATE_JSON from './data/playback-state.json';
import AVAILABLE_DEVICES_JSON from './data/available-devices.json';
import MY_PLAYLISTS_JSON from './data/my-playlists.json';
import RECENTLY_PLAYED_JSON from './data/recently-played.json';
import LAST_SONG_JSON from './data/last-song.json';
import QUEUE_JSON from './data/queue.json';
import QUEUE_LAST_SONG_JSON from './data/queue-last-song.json';
import PLAYER_STATE_JSON from './data/player-state.json';

import PLAYER_STATE_API_JSON from './api/player-state-api.json';

initSpotifyApi();

test(`authorize() redirect to a generated a sportify-authorization-url"`, async () => {
  SpotifyApi.authorize();
  expect(window.location.href).toEqual(
    'https://accounts.spotify.com/authorize?response_type=code&client_id=be4ae675c4e84eae88327846078637a7&scope=streaming%20user-modify-playback-state%20user-read-currently-playing%20user-read-private%20user-read-email%20user-library-read%20playlist-read-private%20user-read-recently-played%20playlist-read-collaborative%20user-read-playback-state&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fspotify-tokens%2F',
  );
});

test(`forceSpotifyAuthorization() to clear localStorage & redirect"`, async () => {
  const clearSpy = vi.spyOn(Storage.prototype, 'clear');
  await SpotifyApi.forceSpotifyAuthorization();

  // test localStorage.clear
  expect(clearSpy).toHaveBeenCalledOnce();

  // test redirect to "/"
  const match = window.location.href.match(/(https?):\/\/(www\.)?([^/]+)(\/.*)/);
  const path = match[4];
  expect(path).toEqual('/');
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
  const actual = await SpotifyApi.getMyPlaylists('laosoupi59');
  const expected = [...MY_PLAYLISTS_JSON];
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

test(`determineLastSong returns SpotifySong`, async () => {
  const actual = await SpotifyApi.determineLastSong();
  const expected = { ...LAST_SONG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getPlayerState(state) returns SpotifyPlayerState`, async () => {
  const actual = await SpotifyApi.getPlayerState({ ...PLAYER_STATE_API_JSON });
  const expected = { ...PLAYER_STATE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});
