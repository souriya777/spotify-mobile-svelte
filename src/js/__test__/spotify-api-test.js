import { vi } from 'vitest';

import CURRENT_USER_API_JSON from './api/current-user-api.json';
import CURRENT_PLAYING_TRACK_API_JSON from './api/current-playing-track-api.json';
import AVAILABLE_DEVICES_API_JSON from './api/available-devices-api.json';

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
      return { ...CURRENT_PLAYING_TRACK_API_JSON };
    } else if (endpoint === '/me/player/devices') {
      return { ...AVAILABLE_DEVICES_API_JSON };
    }
  }
}
