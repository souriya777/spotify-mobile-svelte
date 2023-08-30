import { expect, test } from 'vitest';
import { initSpotifyApi } from './spotify-api-test'; // 🔴 it has to be among 1st import

import SpotifyApi from '@/js/SpotifyApi';

import CURRENT_USER_JSON from './data/current-user.json';
import CURRENT_PLAYING_TRACK_JSON from './data/current-playing-track.json';
import AVAILABLE_DEVICES_JSON from './data/available-devices.json';
import MY_PLAYLISTS_JSON from './data/my-playlists.json';
import RECENTLY_PLAYED_JSON from './data/recently-played.json';
import LAST_SONG_JSON from './data/last-song.json';
import QUEUE_JSON from './data/queue.json';
import QUEUE_LAST_SONG_JSON from './data/queue-last-song.json';

initSpotifyApi();

test(`/me returns SpotifyUser`, async () => {
  const actual = await SpotifyApi.me();
  const expected = { ...CURRENT_USER_JSON };

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player returns SpotifyPlaybackState`, async () => {
  const actual = await SpotifyApi.getPlaybackState();
  const expected = { ...CURRENT_PLAYING_TRACK_JSON };

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/devices returns SpotifyDeviceList`, async () => {
  const actual = await SpotifyApi.getAvailableDevice();
  const expected = { ...AVAILABLE_DEVICES_JSON };
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

test(`getQueueLastSong() returns SpofityTrack`, async () => {
  const actual = await SpotifyApi.getQueueLastSong();
  const expected = { ...QUEUE_LAST_SONG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getLastSong returns SpotifySong`, async () => {
  const actual = await SpotifyApi.getLastSong();
  const expected = { ...LAST_SONG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});
