import { writable, derived } from 'svelte/store';

export const SPOTIFY_ACCESS_TOKEN = writable('');
export const CAN_PLAY = derived(
  SPOTIFY_ACCESS_TOKEN,
  ($SPOTIFY_ACCESS_TOKEN) => $SPOTIFY_ACCESS_TOKEN !== ''
);
