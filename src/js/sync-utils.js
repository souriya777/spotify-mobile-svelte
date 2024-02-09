import Logger from '@js/Logger';
import SpotifyApi from '@js/SpotifyApi';
import { likedTracks } from '@js/store';

const LOGGER = Logger.getNewInstance('sync-utils.js');

async function loadVitalData() {
  //
  console.log('loadVitalData');
  loadLikedTracks();
}

async function loadLikedTracks() {
  LOGGER.log('--- load liked songs');
  const liked = await SpotifyApi.getLikedTracks();
  likedTracks.set(liked);
}

export { loadVitalData };
