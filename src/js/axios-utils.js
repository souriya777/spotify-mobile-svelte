import { get } from 'svelte/store';
import axios from 'axios';
import Logger from '@js/Logger';
import { accessToken } from '@js/store';

const LOGGER = Logger.getNewInstance('axios-utils.js');
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

const _AXIOS_INSTANCE = axios.create({
  baseURL: SPOTIFY_API_URL,
});

function AXIOS_INSTANCE() {
  syncAccessTokenWithStore();
  return _AXIOS_INSTANCE;
}

function setAxiosHeaderAuthorization(accessToken) {
  if (accessToken) {
    // set defaut axios headers
    _AXIOS_INSTANCE.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    LOGGER.log('', _AXIOS_INSTANCE.defaults.headers.common.Authorization);
  }
}

function syncAccessTokenWithStore() {
  const accessTokenInStore = get(accessToken);
  if (!_AXIOS_INSTANCE.defaults.headers.common.Authorization && accessTokenInStore) {
    setAxiosHeaderAuthorization(accessTokenInStore);
  }
}

export { AXIOS_INSTANCE, setAxiosHeaderAuthorization, syncAccessTokenWithStore };
