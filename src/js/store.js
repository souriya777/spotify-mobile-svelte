import { writable, derived } from 'svelte/store';
import { writableLocalStorage } from '@/js/store-utils';
import SpotifyRepeatState from '@/js/SpotifyRepeatState';
import { millisToMinuteSecond, progressPercent } from '@/js/time-utils';

// PERSISTENT
const spotifyAccessToken = writableLocalStorage('spotifyAccessToken', '');
const spotifyUserId = writableLocalStorage('spotifyUserId', '');
const spotifyAuthorizeWaiting = writableLocalStorage('spotifyAuthorizeWaiting', false);

// WRITABLE ONLY
const spotifyDeviceId = writable('');
const apiTimestamp = writable(null);
const player = writable(null);
const playerIsFull = writable(false);
const playerIsReady = derived(
  [spotifyDeviceId, player],
  ([$spotifyDeviceId, $player]) => $spotifyDeviceId && $player != null,
);
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

const trackUri = writable('');
const trackName = writable('');
const albumUri = writable('');
const albumName = writable('');
const imageUrl = writable('');
/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyArtist[]>} */
const artists = writable([]);
const artistsDisplay = derived(artists, ($artists) => $artists.map((item) => item.name).join(', '));

/** @type {import('svelte/store').Writable<import('@/js/spotify').SpotifyDevice[]>} */
const devices = writable([]);

export {
  spotifyAccessToken,
  spotifyUserId,
  spotifyAuthorizeWaiting,
  spotifyDeviceId,
  player,
  playerIsFull,
  playerIsReady,
  trackUri,
  trackName,
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
};
