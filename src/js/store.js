import { writable, derived } from 'svelte/store';
import { setAxiosHeaderAuthorization } from '@/js/axios-utils';
import SpotifyRepeatState from '@/js/SpotifyRepeatState';
import { millisToMinuteSecond, progressPercent } from '@/js/time-utils';

// PERSISTENT
const spotifyAccessToken = writableLocalStorage('spotifyAccessToken', '');
const spotifyUserId = writableLocalStorage('spotifyUserId', '');
const spotifyDeviceId = writableLocalStorage('spotifyDeviceId', '');
const spotifyAuthorizeWaiting = writableLocalStorage('spotifyAuthorizeWaiting', false);

// WRITABLE ONLY
const player = writable(null);
const playerIsFull = writable(false);
const playerIsReady = derived(
  [spotifyDeviceId, player],
  ([$spotifyDeviceId, $player]) => $spotifyDeviceId && $player != null,
);
const songUri = writable('');
const songName = writable('');
const albumName = writable('');
const albumUri = writable('');
const imageUrl = writable('');
/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyArtist[]>} */
const artists = writable([]);
const artistsDisplay = derived(artists, ($artists) => $artists.map((item) => item.name).join(', '));
const shuffleState = writable(false);
const repeatState = writable(SpotifyRepeatState.OFF);
const isPlaying = writable(false);
const progressMs = writable(0);
const progressMsTick = derived(
  [progressMs, isPlaying],
  ([$progressMs, $isPlaying], set, update) => {
    set($progressMs);
    const interval = setInterval(() => {
      if ($isPlaying) {
        update((n) => n + 1000);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  },
);
const durationMs = writable(0);
const current_m_ss = derived(progressMsTick, ($progressMsTick) =>
  millisToMinuteSecond($progressMsTick),
);
const end_m_ss = derived(durationMs, ($durationMs) => millisToMinuteSecond($durationMs));
const progress_percent = derived([progressMsTick, durationMs], ([$progressMsTick, $durationMs]) =>
  progressPercent($progressMsTick, $durationMs),
);
/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyDevice[]>} */
const devices = writable([]);
const apiTimestamp = writable(null);

function writableLocalStorage(key, initialValue) {
  let value = writable(localStorage.getItem(key) || initialValue);

  const write = (key, initialValue) => {
    const lastValue = localStorage.getItem(key) || initialValue;
    value = writable(lastValue);
  };

  value.subscribe((val) => {
    if ([null, undefined].includes(val)) {
      localStorage.removeItem(key);
      document.removeEventListener('storage', write);
    } else {
      localStorage.setItem(key, val);
      document.addEventListener('storage', write);

      if ('spotifyAccessToken' === key) {
        setAxiosHeaderAuthorization(val);
      }
    }
  });

  return value;
}

function clearWritableLocalStorage() {
  spotifyAuthorizeWaiting.set(null);
  spotifyAccessToken.set(null);
}

export {
  spotifyAccessToken,
  spotifyUserId,
  spotifyAuthorizeWaiting,
  spotifyDeviceId,
  player,
  playerIsFull,
  playerIsReady,
  songUri,
  songName,
  albumName,
  albumUri,
  imageUrl,
  artists,
  artistsDisplay,
  shuffleState,
  repeatState,
  isPlaying,
  progressMs,
  progressMsTick,
  durationMs,
  current_m_ss,
  end_m_ss,
  progress_percent,
  apiTimestamp,
  devices,
  clearWritableLocalStorage,
};
