import { expect, test } from 'vitest';
import {
  extractSuggestionsFromSpotifySearch,
  findArtistLikedTracks,
  findArtistLikedReleases,
} from '@js/spotify-utils';
import SEARCH_SHERRY_JSON from './data/search-sherry.json';
import SEARCH_SHE_JSON from './data/search-she.json';
import SUGGESTION_SHERRY_JSON from './data/suggestion-sherry.json';
import SUGGESTION_SHE_JSON from './data/suggestion-she.json';
import LIKED_SONGS_2_JSON from './data/liked-songs-2.json';
import ALBUMS_RECENTLY_PLAYED_JSON from './data/albums-recently-played.json';
import ARTIST_TAYLOR_SWIFT_LIKED_TRACKS_JSON from './data/artist-taylor-swift-liked-tracks.json';
import ARTIST_TAYLOR_SWIFT_LIKED_RELEASES_JSON from './data/artist-taylor-swift-liked-releases.json';

/**
 * @typedef {import('@js/spotify').SpotifyTrack} SpotifyTrack
 * @typedef {import('@js/spotify').SpotifyAlbum} SpotifyAlbum
 */

test(`with 'sherry' search, extractSuggestionsFromSpotifySearch`, async () => {
  const spotifySearch = { ...SEARCH_SHERRY_JSON };
  // @ts-ignore
  const actual = extractSuggestionsFromSpotifySearch('sherry', spotifySearch);
  const expected = [...SUGGESTION_SHERRY_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`with 'she' search, extractSuggestionsFromSpotifySearch`, async () => {
  const spotifySearch = { ...SEARCH_SHE_JSON };
  // @ts-ignore
  const actual = extractSuggestionsFromSpotifySearch('she', spotifySearch);
  const expected = [...SUGGESTION_SHE_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`findArtistLikedTracks() of Taylor Swift returns "3 liked tracks"`, async () => {
  /** @type {SpotifyTrack[]} */
  // @ts-ignore
  const LIKED_SONGS_2 = [...LIKED_SONGS_2_JSON];
  const actual = findArtistLikedTracks('06HL4z0CvFAxyc27GXpf02', LIKED_SONGS_2);
  const expected = [...ARTIST_TAYLOR_SWIFT_LIKED_TRACKS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`findArtistLikedReleases() of Taylor Swift returns "2 liked releases"`, async () => {
  /** @type {SpotifyAlbum[]} */
  // @ts-ignore
  const MY_ALBUMS = [...ALBUMS_RECENTLY_PLAYED_JSON];
  const actual = findArtistLikedReleases('06HL4z0CvFAxyc27GXpf02', MY_ALBUMS);
  const expected = [...ARTIST_TAYLOR_SWIFT_LIKED_RELEASES_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});
