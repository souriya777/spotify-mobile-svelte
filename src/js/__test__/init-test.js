import { vi } from 'vitest';
import Logger from '@/js/Logger';

import CURRENT_USER_API_JSON from './api/current-user-api.json';
import PLAYBACK_STATE_API_JSON from './api/playback-state-api.json';
import AVAILABLE_DEVICES_API_JSON from './api/available-devices-api.json';
import MY_ALBUMS_OFFSET_0_API_JSON from './api/my-albums-offset-0-api.json';
import MY_ALBUMS_OFFSET_50_API_JSON from './api/my-albums-offset-50-api.json';
import PLAYLIST_KARAOKE_SONGS_API_JSON from './api/playlist-karaoke-songs-api.json';
import ALBUM_ORELSAN_TRACKS_API_JSON from './api/album-orelsan-tracks-api.json';
import MY_FOLLOWING_ARTISTS_API_OFFSET_0_JSON from './api/my-following-artists-offset-0-api.json';
import MY_FOLLOWING_ARTISTS_API_OFFSET_50_JSON from './api/my-following-artists-offset-50-api.json';
import RECENTLY_PLAYED_API_JSON from './api/recently-played-api.json';
import QUEUE_API_JSON from './api/queue-api.json';
import MY_PLAYLISTS_OFFSET_0_API_JSON from './api/my-playlists-offset-0-api.json';
import MY_PLAYLISTS_OFFSET_50_API_JSON from './api/my-playlists-offset-50-api.json';
import MY_PLAYLISTS_OFFSET_100_API_JSON from './api/my-playlists-offset-100-api.json';
import LIKED_SONGS_OFFSET_0_API from './api/liked-songs-offset-0-api.json';
import LIKED_SONGS_OFFSET_50_API from './api/liked-songs-offset-50-api.json';
import LIKED_SONGS_OFFSET_100_API from './api/liked-songs-offset-100-api.json';
import LIKED_SONGS_OFFSET_150_API from './api/liked-songs-offset-150-api.json';
import LIKED_SONGS_OFFSET_200_API from './api/liked-songs-offset-200-api.json';
import LIKED_SONGS_OFFSET_250_API from './api/liked-songs-offset-250-api.json';
import LIKED_SONGS_OFFSET_300_API from './api/liked-songs-offset-300-api.json';
import LIKED_SONGS_OFFSET_350_API from './api/liked-songs-offset-350-api.json';
import LIKED_SONGS_OFFSET_400_API from './api/liked-songs-offset-400-api.json';
import LIKED_SONGS_OFFSET_450_API from './api/liked-songs-offset-450-api.json';
import LIKED_SONGS_OFFSET_500_API from './api/liked-songs-offset-500-api.json';
import LIKED_SONGS_OFFSET_550_API from './api/liked-songs-offset-550-api.json';
import LIKED_SONGS_OFFSET_600_API from './api/liked-songs-offset-600-api.json';
import LIKED_SONGS_OFFSET_650_API from './api/liked-songs-offset-650-api.json';
import LIKED_SONGS_OFFSET_700_API from './api/liked-songs-offset-700-api.json';
import LIKED_SONGS_OFFSET_750_API from './api/liked-songs-offset-750-api.json';
import SEARCH_SHERRY_API from './api/search-sherry-api.json';

const REGEX_CLIENT_ID_OR_SECRET = /\w{10,}/i;

Logger.TEST_MODE = true;

function axiosFake(method, url, data, config) {
  const DATA = getData(method, url, data, config);

  return Promise.resolve({
    data: DATA,
    status: 200,
  });
}

export function initSpotifyApi() {
  vi.mock('@/js/axios-utils', () => {
    const AXIOS_INSTANCE = {
      get: (url) => axiosFake('GET', url),
      post: (url, data, config) => axiosFake('POST', url, data, config),
      put: (url, data) => axiosFake('PUT', url, data),
      delete: (url, data) => axiosFake('DELETE', url, { data }),
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

function getData(method, url, data, config) {
  const endpoint = getSpotifyEndpoint(url);

  if (method === 'GET') {
    if (endpoint === '/me') {
      return { ...CURRENT_USER_API_JSON };
    } else if (endpoint === '/me/player') {
      return { ...PLAYBACK_STATE_API_JSON };
    } else if (endpoint === '/me/player/devices') {
      return { ...AVAILABLE_DEVICES_API_JSON };
    } else if (endpoint === '/me/albums?limit=50') {
      return { ...MY_ALBUMS_OFFSET_0_API_JSON };
    } else if (/\/me\/albums\?offset=50&limit=50/g.test(endpoint)) {
      return { ...MY_ALBUMS_OFFSET_50_API_JSON };
    } else if (endpoint === '/playlists/2bsNu8LBBJhmmdJ9zp7gkw/tracks?limit=50') {
      return { ...PLAYLIST_KARAOKE_SONGS_API_JSON };
    } else if (endpoint === '/albums/2o2GBOfy2GG9oKYZgfZkur/tracks') {
      return { ...ALBUM_ORELSAN_TRACKS_API_JSON };
    } else if (endpoint === '/me/following?type=artist&limit=50') {
      return { ...MY_FOLLOWING_ARTISTS_API_OFFSET_0_JSON };
    } else if (/\/me\/following\?type=artist.*&after=/g.test(endpoint)) {
      return { ...MY_FOLLOWING_ARTISTS_API_OFFSET_50_JSON };
    } else if (endpoint === '/me/player/recently-played') {
      return { ...RECENTLY_PLAYED_API_JSON };
    } else if (endpoint === '/me/player/queue') {
      return { ...QUEUE_API_JSON };
    } else if (endpoint === '/users/laosoupi59/playlists?limit=50') {
      return { ...MY_PLAYLISTS_OFFSET_0_API_JSON };
    } else if (endpoint === '/users/laosoupi59/playlists?offset=50&limit=50') {
      return { ...MY_PLAYLISTS_OFFSET_50_API_JSON };
    } else if (endpoint === '/users/laosoupi59/playlists?offset=100&limit=50') {
      return { ...MY_PLAYLISTS_OFFSET_100_API_JSON };
    } else if (endpoint === '/me/tracks?limit=50') {
      return { ...LIKED_SONGS_OFFSET_0_API };
    } else if (endpoint === '/me/tracks?offset=50&limit=50') {
      return { ...LIKED_SONGS_OFFSET_50_API };
    } else if (endpoint === '/me/tracks?offset=100&limit=50') {
      return { ...LIKED_SONGS_OFFSET_100_API };
    } else if (endpoint === '/me/tracks?offset=150&limit=50') {
      return { ...LIKED_SONGS_OFFSET_150_API };
    } else if (endpoint === '/me/tracks?offset=200&limit=50') {
      return { ...LIKED_SONGS_OFFSET_200_API };
    } else if (endpoint === '/me/tracks?offset=250&limit=50') {
      return { ...LIKED_SONGS_OFFSET_250_API };
    } else if (endpoint === '/me/tracks?offset=300&limit=50') {
      return { ...LIKED_SONGS_OFFSET_300_API };
    } else if (endpoint === '/me/tracks?offset=350&limit=50') {
      return { ...LIKED_SONGS_OFFSET_350_API };
    } else if (endpoint === '/me/tracks?offset=400&limit=50') {
      return { ...LIKED_SONGS_OFFSET_400_API };
    } else if (endpoint === '/me/tracks?offset=450&limit=50') {
      return { ...LIKED_SONGS_OFFSET_450_API };
    } else if (endpoint === '/me/tracks?offset=500&limit=50') {
      return { ...LIKED_SONGS_OFFSET_500_API };
    } else if (endpoint === '/me/tracks?offset=550&limit=50') {
      return { ...LIKED_SONGS_OFFSET_550_API };
    } else if (endpoint === '/me/tracks?offset=600&limit=50') {
      return { ...LIKED_SONGS_OFFSET_600_API };
    } else if (endpoint === '/me/tracks?offset=650&limit=50') {
      return { ...LIKED_SONGS_OFFSET_650_API };
    } else if (endpoint === '/me/tracks?offset=700&limit=50') {
      return { ...LIKED_SONGS_OFFSET_700_API };
    } else if (endpoint === '/me/tracks?offset=750&limit=50') {
      return { ...LIKED_SONGS_OFFSET_750_API };
    } else if (endpoint === '/search?q=sherry&type=album%2Cplaylist%2Ctrack%2Cartist&offset=0') {
      return { ...SEARCH_SHERRY_API };
    }

    return getDataForPlaylistsTracks(endpoint);
  } else if (method === 'POST') {
    if (url === 'https://accounts.spotify.com/api/token') {
      const { headers } = config;

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
    if (endpoint === '/me/player') {
      // @ts-ignore
      if (!data.device_ids[0] === 'my-device-id-123' || !data.play === true) {
        throw new Error();
      }
    }
  }
}

/**
 * GENERATED (otherwise it's tedious ^^') WITH :
 * 
  if (/fields=items/g.test(endpoint)) {
    console.log(`
      else if (endpoint === '${endpoint}') {
        return {
          "items": [
              {
                  "added_at": "${data?.items?.[0]?.['added_at']}"
              }
          ]
        };
      }
    `);
  } else {
    LOGGER.log(options?.method, endpoint, data, status);
  }
 */
function getDataForPlaylistsTracks(endpoint) {
  if (endpoint === '/playlists/2bsNu8LBBJhmmdJ9zp7gkw/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-09-12T13:18:10Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/41m5kThWZ8zR7E4c314sC6/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-02-17T02:28:24Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0Hrd9TlXYwpVNNkDzVHObG/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-06-07T20:53:29Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/00iKDOSAmZYKwh5yE3zKTj/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-10-05T20:12:09Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1EM1VkS2a3Qkn8/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-11-27T11:01:03Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1DZ06evO0JU6Vb/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-09-14T12:38:34Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/7EL71mpMb5kXyLFMZ5st2E/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-01-06T08:02:30Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5g1PFTTFrkWI86eUnO8xZs/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-04-20T12:58:29Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5Fm2F7UrhUhFkgh1bBvfx4/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-03-03T10:23:41Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3cZWLPG5VpM23ZtPJ7CaUv/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-04-07T02:49:04Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2vql2UF6S4bNBhbXKrSvIy/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-05-06T14:32:51Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0UGTdbpB5MsrlMd8qAYnYn/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-11-21T16:43:14Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1zrHB5JFiSdGzgzqOblNbP/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-05-11T07:47:58Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5CJP48wgHBCVRRIQ9VaB6L/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-10-25T15:22:40Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1ug1yUzv83HhdGTlFHsAxG/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-03-18T16:36:30Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1EUMDoJuT8yJsl/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '1970-01-01T00:00:00Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5iImF3RSCDfPuM9jmSIqK4/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-05-20T15:44:10Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2xo6A1DffLHO0jp8zPX1DP/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-04-20T12:46:28Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4fDIs5t5peUmAfp93f5voe/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-08-21T09:28:55Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1DZ06evO3tTeRm/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-09-14T12:38:57Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0ImK5xvuMx7FSvZQfcd2rz/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-05-24T13:47:04Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/66HnNJZ9oHUMPurTJpfxiz/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-10-05T10:52:38Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1U1jRgk7dVRU239ezrXuFC/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-05-22T17:21:04Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1uEQmJ14RmkkDfLTOuulif/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-01-14T15:59:41Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1vCRha4cvGomcmbqaANzmk/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-01-04T05:14:10Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/6dtLf1ltF1OIqrMISSiZXE/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-04-20T12:44:29Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3IYjftO5s1u3i0YUrnesPl/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-08-27T04:54:52Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2KwWMvYgpOjMFnKL8r2pnt/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-06-23T09:55:22Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5PYeEAjs6I41ysDMW7s1WY/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-05-16T07:50:16Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0JcfgwxTvP4g5yO1qw0Jll/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-12-06T10:15:09Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/7nWLr7ueGPIjP6Guk9TIc8/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-01-31T14:25:37Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/79DDJRPWt9zXOQtPPD6vnW/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-08-11T16:50:37Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1E9L28VVOh4qbF/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-11-18T01:15:22Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1CyM9iWmgi9Llc/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2016-12-03T00:00:00Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1nkd07sta8ncmTLqn1kAxO/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-07-19T10:18:34Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4WY961DL0WyiHY69wXKIGA/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-08-21T11:15:36Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1h1y7OSwEKZJvKjBpfLso4/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-07-12T15:16:58Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5Bi15UDSHMOrdO1YkffHPx/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-05-20T07:49:15Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4TpJ16DLKK9u5fFB3JxLpf/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-03-07T12:09:46Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1NbjaASwCH7qwDnPhyZdkY/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-03-15T11:45:03Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/7xNgqKLfWDyR1kN9IBrXOe/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-02-18T09:27:01Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/17eOVmN640LTnMK3fsGWVF/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-09-05T16:31:47Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1EuU6b8McVCZHK/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-09-14T00:00:00Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1F0sijgNaJdgit/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '1970-01-01T00:00:00Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5REmUGaylWTCQ0bx16yqlz/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-01-20T17:00:10Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1CApX1MvV9N0jE/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-06-23T06:33:18Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/6tjDm3M7hUf7OesMWnfITA/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-06-20T15:24:59Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5Yd8FbYDVQAqUr1Xm7vZ07/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2023-07-12T16:54:25Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/6ejSj641Qt595xtoan9RZY/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-09-25T14:41:04Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/37i9dQZF1EtdhN0ZZbE5pG/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-12-12T21:20:54Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0Vm7IQgo6Czr4EwWqIYUDO/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-04-05T14:48:11Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2qdpZHcUOAXgZsBtqBkPTP/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-04-12T21:28:11Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1xSEI4P2hBjotEiMDIhhFz/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-02-14T14:48:18Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0MquL7mNYbhrjf1oEN88TG/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-01-07T15:14:18Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4UsR6Jy4s8g7o5TALkNjrf/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-04-26T07:00:50Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2UQxBcHNiRFoE29CybJH8d/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-09-06T11:02:54Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5I2HAPo6i6FE6jeO2UaXEh/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-12-12T17:33:19Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/6pVutXk3Vz8NrSy1tws1cJ/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-03-29T08:39:56Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/6C4REh7rpXh7pxvv4KLM1Z/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-11-13T10:00:05Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2LuJtAF7eKfnPJTqkw3lhf/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-02-27T08:21:21Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3Ul9vedpc0YOuAVWI1EhVe/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-06-15T16:15:13Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2KMfXxiIVVjy7o6A4OfvVg/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-06-15T16:15:22Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2X6YAw3jGF8ofecQRNhXxM/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-12-26T20:33:26Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/10dH8NBptQgluEYLXllV4U/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-10-08T18:57:37Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0rBKERzkbvfRSCRGQBbmc4/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-07-13T11:05:15Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3MtMal6Vmq8n4sgrCabuBM/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-02-27T08:14:39Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3hPO81Jx7vIsSAehg97syB/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-02-27T07:49:16Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4gaFcGywUMezsqVLHvMVuc/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2019-02-21T11:36:59Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3Lwkhzai7meuoRsWHukcrU/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-10-26T12:55:10Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1XHG01LFGk7owtER5hMEor/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-08-29T19:21:31Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5bZdWn0MDlwoPdbkUmpcZW/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-08-19T07:17:24Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2ZOgVf5IiYW9akx0WQfhN4/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-06-28T08:25:19Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4swY8gtDc1gr96RFgLAfFH/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2020-04-13T08:49:27Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/29wzVwvi9kjesa3Uj2hEGg/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-05-12T06:58:22Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4SuuituKTHsNlwz1OeMFLg/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-04-19T09:11:47Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/50j6B1K0I04KKriPvv5CUw/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-05-21T21:38:16Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/7Ep8Uc6ZjsroyPpoVHkNPZ/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-05-24T14:06:49Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5tydXasvHCihwLcvsrRnw4/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2021-01-23T01:54:00Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3U3WxPNu0UMThg8W8Bfvy5/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-08-25T11:11:01Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4cqlUxYB80PiuAPUPpcDqK/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2015-12-26T11:30:29Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0u9CkcZTosSaUD2bTSyJIE/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-07-11T13:20:00Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3eWkUaK2dDzA4VHw6SKj1Z/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2016-04-03T16:45:02Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4RF7mw2Acseouq7QOnaVi3/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2016-11-10T06:56:57Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3Z3btTHiNpXUkWBmIikkiK/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-08-18T18:21:57Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4c1CPpMxx1CSvmE4zBYW29/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2016-08-10T16:01:22Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/2g0bXJjmb6I578YhcdAxZ2/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-05-15T17:11:19Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1g04RseplfrcqmVNRcnoQ4/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2015-03-27T17:06:44Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/7sg2Rh483hbI8Mis0cbz1V/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2012-01-30T10:45:59Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/7hJHUr8O7M3bY4HKHEJXIt/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-05-07T15:46:08Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/6s00SlXFU9nvNiNwQ4cDWd/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2012-06-24T12:27:21Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/11pNI7wiaIddrUVwmIWWRy/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-10-21T17:54:37Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0KuLTdc5hWOuMmUXgZTxHk/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-05-13T22:30:40Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0ehrdIn2aBilLrd0QmCygW/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2017-05-29T14:55:49Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5qRtTHMNmwJzWRNlIk9xqe/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2013-01-04T07:52:31Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0OxE9Q5A3FhXOn51gMW4wp/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-05-09T15:12:23Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/3Bd1YD9MvXM7xW6PgeHKs6/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2022-01-12T20:50:58Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5af9hlA2YoJEdOyNWZHO85/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2015-03-27T17:08:16Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1u4HagRrG0nktm4aBtdgnI/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2015-03-27T17:07:11Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/5rYCGSIcUQ8Ns99j2gw2Sr/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2016-07-23T05:58:42Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/0wq78NdSIJkaQ2pYtNjetE/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-05-16T08:32:01Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/1pl5WGDoS49mVGAeKZt17s/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-05-03T09:48:53Z',
        },
      ],
    };
  } else if (endpoint === '/playlists/4cKmyLa36tSN334mDvyadA/tracks?fields=items%28added_at%29') {
    return {
      items: [
        {
          added_at: '2018-01-31T12:42:33Z',
        },
      ],
    };
  }
}
