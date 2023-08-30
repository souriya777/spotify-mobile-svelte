import { vi } from 'vitest';

import CURRENT_USER_API_JSON from './api/current-user-api.json';
import PLAYBACK_STATE_API_JSON from './api/playback-state-api.json';
import AVAILABLE_DEVICES_API_JSON from './api/available-devices-api.json';
import MY_PLAYLISTS_API_JSON from './api/my-playlists-api.json';
import RECENTLY_PLAYED_API_JSON from './api/recently-played-api.json';
import QUEUE_API_JSON from './api/queue-api.json';

export function initSpotifyApi() {
  vi.mock('@/js/axios-utils', () => {
    /** @param {import('./axios').AxiosOptions} options */
    const AXIOS_INSTANCE = ({ method, url }) => {
      const endpoint = getSpotifyEndpoint(url);

      const data = getData(method, endpoint);

      return Promise.resolve({
        data,
        status: 200,
      });
    };

    return {
      AXIOS_INSTANCE,
      setAxiosHeaderAuthorization: () => vi.fn(),
    };
  });
}

function getSpotifyEndpoint(url) {
  return url.match(/(?<=v1)(\S)*/)?.[0];
}

function getData(method, endpoint) {
  if (method === 'GET') {
    if (endpoint === '/me') {
      return { ...CURRENT_USER_API_JSON };
    } else if (endpoint === '/me/player') {
      return { ...PLAYBACK_STATE_API_JSON };
    } else if (endpoint === '/me/player/devices') {
      return { ...AVAILABLE_DEVICES_API_JSON };
    } else if (endpoint === '/users/laosoupi59/playlists') {
      return { ...MY_PLAYLISTS_API_JSON };
    } else if (endpoint === '/me/player/recently-played') {
      return { ...RECENTLY_PLAYED_API_JSON };
    } else if (endpoint === '/me/player/queue') {
      return { ...QUEUE_API_JSON };
    }
  }
}
