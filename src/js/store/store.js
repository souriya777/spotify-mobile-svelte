import { writable, derived } from 'svelte/store';
import { writableLocalStorage } from '@/js/store-utils';
import SpotifyRepeatState from '@/js/SpotifyRepeatState';
import { millisToMinuteSecond, progressPercent } from '@/js/time-utils';

// ACCESS
const accessToken = writableLocalStorage('accessToken', '');
const authorizationOk = writableLocalStorage('authorizationOk', false);

// USER
const userId = writable('');

// TRACK
const trackUri = writable('');
const trackName = writable('');
const albumUri = writable('');
const albumName = writable('');
const imageUrl = writable('');
/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyArtist[]>} */
const artists = writable([]);
const artistsDisplay = derived(artists, ($artists) =>
  $artists?.map((item) => item.name).join(', '),
);

// DEVICE
const deviceId = writableLocalStorage('deviceId', '');
/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyDevice[]>} */
const devices = writable([]);

// PLAYER
const player = writable(null);
const shuffleState = writable(false);
const repeatState = writable(SpotifyRepeatState.OFF);
const playing = writable(false);
const progressMs = writable(0);
const progressMsTick = derived([progressMs, playing], ([$progressMs, $playing], set, update) => {
  set($progressMs);
  const interval = setInterval(() => {
    if ($playing) {
      update((n) => n + 1000);
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});
const durationMs = writable(0);
const current_m_ss = derived(progressMsTick, ($progressMsTick) =>
  millisToMinuteSecond($progressMsTick),
);
const end_m_ss = derived(durationMs, ($durationMs) => millisToMinuteSecond($durationMs));
const progress_percent = derived([progressMsTick, durationMs], ([$progressMsTick, $durationMs]) =>
  progressPercent($progressMsTick, $durationMs),
);

// MISCELLANEOUS
const apiTimestamp = writable(null);

export {
  accessToken,
  userId,
  authorizationOk,
  deviceId,
  player,
  trackUri,
  trackName,
  albumName,
  albumUri,
  imageUrl,
  artists,
  artistsDisplay,
  shuffleState,
  repeatState,
  playing,
  progressMs,
  progressMsTick,
  durationMs,
  current_m_ss,
  end_m_ss,
  progress_percent,
  apiTimestamp,
  devices,
};
