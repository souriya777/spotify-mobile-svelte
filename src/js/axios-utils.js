'use strict';

import axios from 'axios';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export const AXIOS_INSTANCE = axios.create({
  baseURL: SPOTIFY_API_URL,
});

export function setAxiosHeaderAuthorization(accessToken) {
  // set defaut axios headers
  AXIOS_INSTANCE.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  console.log('[souriya 😎][axios-utils]:', AXIOS_INSTANCE.defaults.headers.common.Authorization);
}
