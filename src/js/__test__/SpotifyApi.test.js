import { expect, test } from 'vitest';
import { initSpotifyApi } from './spotify-api-test'; // 🔴 it has to be among 1st import

import SpotifyApi from '@/js/SpotifyApi';

import CURRENT_USER_JSON from './data/current-user.json';
import CURRENT_PLAYING_TRACK_JSON from './data/current-playing-track.json';
import AVAILABLE_DEVICES_JSON from './data/available-devices.json';

initSpotifyApi();

test(`/me returns user information`, async () => {
  const actual = await SpotifyApi.me();
  const expected = { ...CURRENT_USER_JSON };

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player get playback state`, async () => {
  const actual = await SpotifyApi.getPlaybackState();
  const expected = { ...CURRENT_PLAYING_TRACK_JSON };

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/devices get all devices`, async () => {
  const actual = await SpotifyApi.getAvailableDevice();
  const expected = { ...AVAILABLE_DEVICES_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});
