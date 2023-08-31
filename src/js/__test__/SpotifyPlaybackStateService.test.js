import { expect, test } from 'vitest';
import SpotifyPlaybackState from '@/js/SpotifyPlaybackState';
import SpotifyPlaybackStateService from '@/js/SpotifyPlaybackStateService';

import PLAYBACK_STATE_JSON from './data/playback-state.json';

test(`can increment of 1s`, async () => {
  let actual = new SpotifyPlaybackState({ ...PLAYBACK_STATE_JSON });
  const expected = new SpotifyPlaybackState({
    ...PLAYBACK_STATE_JSON,
  });
  expected.current_m_ss = '0:07';
  expected.end_m_ss = '3:23';
  expected.progress_ms = 7156;
  expected.progress_percent = 3.523508934330578;

  // increment 1s
  actual.progress_ms += 1000;
  actual = SpotifyPlaybackStateService.refreshProgress(actual);

  expect(actual).toStrictEqual(expected);
});

test(`can increment of 15s`, async () => {
  let actual = new SpotifyPlaybackState({ ...PLAYBACK_STATE_JSON });
  const expected = new SpotifyPlaybackState({
    ...PLAYBACK_STATE_JSON,
  });
  expected.current_m_ss = '0:21';
  expected.end_m_ss = '3:23';
  expected.progress_ms = 21156;
  expected.progress_percent = 10.416902601271339;

  // increment 15s
  actual.progress_ms += 15000;
  actual = SpotifyPlaybackStateService.refreshProgress(actual);

  expect(actual).toStrictEqual(expected);
});
