import { expect, test } from 'vitest';
import { extractSuggestionsFromSpotifySearch } from '@js/spotify-utils';
import SEARCH_SHERRY_JSON from './data/search-sherry.json';
import SEARCH_SHE_JSON from './data/search-she.json';
import SUGGESTION_SHERRY_JSON from './data/suggestion-sherry.json';
import SUGGESTION_SHE_JSON from './data/suggestion-she.json';

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
