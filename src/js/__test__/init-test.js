import { vi } from 'vitest';

import CURRENT_USER_API_JSON from './api/current-user-api.json';
import PLAYBACK_STATE_API_JSON from './api/playback-state-api.json';
import AVAILABLE_DEVICES_API_JSON from './api/available-devices-api.json';
import MY_PLAYLISTS_API_JSON from './api/my-playlists-api.json';
import MY_ALBUMS_API_JSON from './api/my-albums-api.json';
import RECENTLY_PLAYED_API_JSON from './api/recently-played-api.json';
import QUEUE_API_JSON from './api/queue-api.json';

const REGEX_CLIENT_ID_OR_SECRET = /\w{10,}/i;

export function initSpotifyApi() {
  vi.mock('@/js/axios-utils', () => {
    /** @param {import('./axios').AxiosOptions} options */
    const AXIOS_INSTANCE = ({ method, url, headers, data }) => {
      const DATA = getData(method, url, headers, data);

      return Promise.resolve({
        data: DATA,
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

function getData(method, url, headers, data) {
  const endpoint = getSpotifyEndpoint(url);

  if (method === 'GET') {
    if (endpoint === '/me') {
      return { ...CURRENT_USER_API_JSON };
    } else if (endpoint === '/me/player') {
      return { ...PLAYBACK_STATE_API_JSON };
    } else if (endpoint === '/me/player/devices') {
      return { ...AVAILABLE_DEVICES_API_JSON };
    } else if (endpoint === '/users/laosoupi59/playlists') {
      return { ...MY_PLAYLISTS_API_JSON };
    } else if (endpoint === '/me/albums') {
      return { ...MY_ALBUMS_API_JSON };
    } else if (endpoint === '/me/player/recently-played') {
      return { ...RECENTLY_PLAYED_API_JSON };
    } else if (endpoint === '/me/player/queue') {
      return { ...QUEUE_API_JSON };
    }
  } else if (method === 'POST') {
    if (url === 'https://accounts.spotify.com/api/token') {
      const PARAMS = data.split('&');
      const code = PARAMS[0].split('=')[1];
      const redirect_uri = PARAMS[1].split('=')[1];
      const grant_type = PARAMS[2].split('=')[1];
      const client_id = PARAMS[3].split('=')[1];
      const client_secret = PARAMS[4].split('=')[1];

      if (
        headers['Content-Type'] === 'application/x-www-form-urlencoded' &&
        headers['Authorization'] ===
          `Basic YmU0YWU2NzVjNGU4NGVhZTg4MzI3ODQ2MDc4NjM3YTc6NWZlZGMyZTdiMWQ5NGVhZTk3OWUyYmVkNmZmNTRjNWU=` &&
        code === 'AQBxGP9Zt32' &&
        redirect_uri === 'http%3A%2F%2Flocalhost%3A5173%2Fspotify-tokens%2F' &&
        grant_type === 'authorization_code' &&
        REGEX_CLIENT_ID_OR_SECRET.test(client_id) &&
        REGEX_CLIENT_ID_OR_SECRET.test(client_secret)
      ) {
        return {
          access_token:
            'BQD2Wg2mWl1EiTEG9kwkwK1jZgJU-Ytd2cyXpRjm3CS4Je71lEAZfxCF2zkWjdAXFricABDPbB2Ap_dtA-A_CVz5JW-pV9MQerAejAhpkjDCYK0fDEDDnHUag34D7TVeCTXLcP29caaXD90lXSOO0-IR5zylPfAMbObDK9gmYc1E0056SHe-pqmIubWPs_lFdctbjGA4wYhYErMjheW56hZ55jwFddzs1bnsUw',
        };
      }
    }
  } else if (method === 'PUT') {
    console.log(endpoint, headers, data);
    if (endpoint === '/me/player') {
      // @ts-ignore
      if (!data.device_ids[0] === 'my-device-id-123' || !data.play === true) {
        throw new Error();
      }
    }
  }
}
