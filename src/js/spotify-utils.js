'use strict';

import { AXIOS_INSTANCE } from '@/js/axios-utils';
import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_REFRESH_TOKEN, clearLocalStorage } from '@/js/store';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SPOTIFY_SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

function authorize() {
  window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
    SPOTIFY_SCOPES
  )}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`;
}

async function getToken() {
  const authorizationCode = new URL(window.location.href).searchParams.get('code');

  const spotifyData = {
    code: authorizationCode,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    grant_type: 'authorization_code',
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
  };

  const options = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${window.btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
    },
    data: new URLSearchParams(spotifyData).toString(),
  };

  const data = await AXIOS_INSTANCE(options)
    .then((response) => response?.data)
    .catch((error) => {
      console.error(error.toJSON());
    });

  SPOTIFY_ACCESS_TOKEN.set(data.access_token);
  SPOTIFY_REFRESH_TOKEN.set(data.refresh_token);
  // initSpotifyPlayer(TEMP_ACCESS_TOKEN);
}

function forceSpotifyGrant() {
  clearLocalStorage();
  window.location.href = '/';
}

export { authorize, getToken, forceSpotifyGrant };
