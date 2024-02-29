import { expect, test, vi } from 'vitest';
import { get } from 'svelte/store';
import { initSpotifyApi } from './init-test'; // 🔴 it has to be among 1st import

import { AXIOS_INSTANCE } from '@js/axios-utils';
import { accessToken } from '@js/store';
import SpotifyApi from '@js/SpotifyApi';
import SpotifyPlaylist from '@js/SpotifyPlaylist';

import PLAYER_STATE_API_JSON from './api/player-state-api.json';
import USER_ME_JSON from './data/user-me.json';
import USER_ANDREA_BOTEZ_JSON from './data/user-andrea-botez.json';
import PLAYBACK_STATE_JSON from './data/playback-state.json';
import AVAILABLE_DEVICES_JSON from './data/available-devices.json';
import MY_PLAYLISTS_RECENTLY_ADDED_JSON from './data/my-playlists-recently-added.json';
import MY_PLAYLISTS_SORTED_ALPHABETICALLY_JSON from './data/my-playlists-sorted-alphabetically.json';
import LIKED_SONGS_JSON from './data/liked-songs.json';
import PLAYLIST_KARAOKE_DETAIL_JSON from './data/playlist-karaoke-detail.json';
import PLAYLIST_KARAOKE_TRACKS_JSON from './data/playlist-karaoke-tracks.json';
import ALBUM_CHOPIN_LANG_LANG_JSON from './data/album-chopin-lang_lang.json';
import ALBUM_ORELSAN_TRACKS_JSON from './data/album-orelsan-tracks.json';
import ALBUMS_RECENTLY_PLAYED_JSON from './data/albums-recently-played.json';
import ALBUMS_RECENTLY_ADDED_JSON from './data/albums-recently-added.json';
import MY_FOLLOWING_ARTISTS_JSON from './data/my-following-artists.json';
import ARTIST_TAYLOR_SWIFT_JSON from './data/artist-taylor-swift.json';
import ARTIST_TAYLOR_SWIFT_DISCOGRAPHY_JSON from './data/artist-taylor-swift-discography.json';
import ARTIST_TAYLOR_SWIFT_LATEST_RELEASE_JSON from './data/artist-taylor-swift-latest-release.json';
import ARTIST_TAYLOR_SWIFT_TOP_TRACKS_JSON from './data/artist-taylor-swift-top-tracks.json';
import ARTIST_TAYLOR_SWIFT_TOP_RELEASES_JSON from './data/artist-taylor-swift-top-releases.json';
import ARTIST_TAYLOR_SWIFT_APPEARS_ON_JSON from './data/artist-taylor-swift-appears-on.json';
import ARTIST_TAYLOR_SWIFT_RELATED_ARTISTS_JSON from './data/artist-taylor-swift-related-artists.json';
import ARTIST_MAZE_DISCOGRAPHY_JSON from './data/artist-maze-discography.json';
import ARTIST_MAZE_LATEST_RELEASE_JSON from './data/artist-maze-latest-release.json';
import ARTIST_MAZE_TOP_TRACKS_JSON from './data/artist-maze-top-tracks.json';
import ARTIST_MAZE_TOP_RELEASES_JSON from './data/artist-maze-top-releases.json';
import ARTISTS_SEVERAL_JSON from './data/artists-several.json';
import RECENTLY_PLAYED_JSON from './data/recently-played.json';
import MY_LIB_RECENTLY_PLAYED_JSON from './data/my-lib-recently-played.json';
import LAST_SONG_JSON from './data/last-song.json';
import QUEUE_JSON from './data/queue.json';
import QUEUE_LAST_SONG_JSON from './data/queue-last-song.json';
import PLAYER_STATE_JSON from './data/player-state.json';
import SINGLE_PLAYLIST_JSON from './data/single-playlist.json';
import SEARCH_SHERRY_JSON from './data/search-sherry.json';
import SEARCH_SHERRY_OFFSET_50_JSON from './data/search-sherry-offset-50.json';
import SEARCH_SHERRY_OFFSET_3_LIMIT_3_JSON from './data/search-sherry-offset-3-limit-3.json';
import SEARCH_SHERRY_OFFSET_3_LIMIT_3_WITH_EXISTING_RESULTS_JSON from './data/search-sherry-offset-3-limit-3-with-existing-results.json';
import SEARCH_SHE_JSON from './data/search-she.json';
import PLAYLIST_OLD_ORDER_JSON from './data/playlist-old-order.json';
import PLAYLIST_NEW_ORDER_JSON from './data/playlist-new-order.json';

/**
 * @typedef {import('@js/spotify').SpotifyAlbum} SpotifyAlbum
 * @typedef {import('@js/spotify').SpotifyTrack} SpotifyTrack
 * @typedef {import('@js/spotify').SpotifyDiscography} SpotifyDiscography
 * @typedef {import('@js/spotify').SpotifyPlayerState} SpotifyPlayerState
 */

initSpotifyApi();

test(`goToAuthorizeUrl() redirect to a generated a spotify-authorization-url"`, async () => {
  SpotifyApi.goToAuthorizeUrl();
  expect(window.location.href).toEqual(
    'https://accounts.spotify.com/authorize?response_type=code&client_id=be4ae675c4e84eae88327846078637a7&scope=streaming%20user-modify-playback-state%20user-read-currently-playing%20user-read-private%20user-read-email%20user-library-read%20playlist-read-private%20user-read-recently-played%20playlist-read-collaborative%20user-read-playback-state%20user-follow-read%20playlist-modify-public%20playlist-modify-private%20user-library-modify%20user-follow-modify&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fspotify-tokens%2F',
  );
});

test(`forceAuthorization() to clear localStorage & redirect"`, async () => {
  const clearSpy = vi.spyOn(Storage.prototype, 'clear');
  await SpotifyApi.forceAuthorization();

  // test localStorage.clear
  expect(clearSpy).toHaveBeenCalledOnce();

  // test redirect to "/"
  const match = window.location.href.match(/(https?):\/\/(www\.)?([^/]+)(\/.*)/);
  const path = match[4];
  expect(path).toEqual('/');
});

test(`initAccessToken set access_token in store and change url to "/"`, async () => {
  const pushStateSpy = vi.spyOn(window.history, 'pushState');

  window.location.href = '/spotify-tokens/?code=AQBxGP9Zt32';
  await SpotifyApi.initAccessToken();

  // test store value access_token
  expect(get(accessToken)).toEqual(
    'BQD2Wg2mWl1EiTEG9kwkwK1jZgJU-Ytd2cyXpRjm3CS4Je71lEAZfxCF2zkWjdAXFricABDPbB2Ap_dtA-A_CVz5JW-pV9MQerAejAhpkjDCYK0fDEDDnHUag34D7TVeCTXLcP29caaXD90lXSOO0-IR5zylPfAMbObDK9gmYc1E0056SHe-pqmIubWPs_lFdctbjGA4wYhYErMjheW56hZ55jwFddzs1bnsUw',
  );

  // test change url
  expect(pushStateSpy).toHaveBeenLastCalledWith({}, 'token ok', '/');
});

test(`/me returns SpotifyUser`, async () => {
  const actual = await SpotifyApi.me();
  const expected = { ...USER_ME_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/andrea-botez returns SpotifyUser`, async () => {
  const actual = await SpotifyApi.getUser('andrea-botez');
  const expected = { ...USER_ANDREA_BOTEZ_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player returns SpotifyPlaybackState`, async () => {
  const actual = await SpotifyApi.getPlaybackState();
  const expected = { ...PLAYBACK_STATE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/devices returns SpotifyDeviceList`, async () => {
  const actual = await SpotifyApi.getAvailableDevice();
  const expected = [...AVAILABLE_DEVICES_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/users/laosoupi59/playlists returns SpotifyPlaylist[]`, async () => {
  const actual = await SpotifyApi.getPlaylistsSortedBySpotify('laosoupi59');
  const expected = [...MY_PLAYLISTS_RECENTLY_ADDED_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getPlaylistsSortedAlphabetically() returns SpotifyPlaylist[] sorted alphabetically`, async () => {
  const actual = await SpotifyApi.getPlaylistsSortedAlphabetically('laosoupi59');
  const expected = [...MY_PLAYLISTS_SORTED_ALPHABETICALLY_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`extendPlaylistWithAddeAt() return SpotifyPlaylist with 'added_at' field`, async () => {
  /** @type {import('@js/spotify').SpotifyPlaylist} */
  const PLAYLIST = new SpotifyPlaylist({ ...SINGLE_PLAYLIST_JSON });
  const expected = new SpotifyPlaylist({
    ...SINGLE_PLAYLIST_JSON,
    added_at: new Date('2023-09-12T13:18:10Z'),
  });

  const actual = await SpotifyApi.extendPlaylistWithAddeAt(PLAYLIST);

  expect(actual).toStrictEqual(expected);
});

test(`getLikedTracks() returns SpotifyTrack[] sorted by added_at`, async () => {
  const actual = await SpotifyApi.getLikedTracks();
  const expected = [...LIKED_SONGS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getPlaylistDetails() returns SpotifyPlaylist`, async () => {
  const actual = await SpotifyApi.getPlaylistDetails('2bsNu8LBBJhmmdJ9zp7gkw');
  const expected = { ...PLAYLIST_KARAOKE_DETAIL_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getPlaylistTracks() returns SpotifyTrack[] sorted by decrescent added_at`, async () => {
  const actual = await SpotifyApi.getPlaylistTracks('2bsNu8LBBJhmmdJ9zp7gkw');
  const expected = [...PLAYLIST_KARAOKE_TRACKS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getAlbum() returns SpotifyAlbum`, async () => {
  const actual = await SpotifyApi.getAlbum('70CWcZa5F1uq0xmkMBOtah');
  const expected = { ...ALBUM_CHOPIN_LANG_LANG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getAlbumTracks() returns SpotifyAlbumTrack[]`, async () => {
  const actual = await SpotifyApi.getAlbumTracks('2o2GBOfy2GG9oKYZgfZkur');
  const expected = [...ALBUM_ORELSAN_TRACKS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getMySavedAlbumsSortedRecentlyPlayed returns SpotifyAlbum[] sorted by recently played`, async () => {
  const actual = await SpotifyApi.getMySavedAlbumsSortedRecentlyPlayed();
  const expected = [...ALBUMS_RECENTLY_PLAYED_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getMySavedAlbumsSortedRecentlyAdded returns SpotifyAlbum[] sorted by recently added`, async () => {
  const actual = await SpotifyApi.getMySavedAlbumsSortedRecentlyAdded();
  const expected = [...ALBUMS_RECENTLY_ADDED_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/following returns SpotifyArtist[]`, async () => {
  const actual = await SpotifyApi.getMyFollowedArtists();
  const expected = [...MY_FOLLOWING_ARTISTS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/following/contains?type=artist&ids=06HL4z0CvFAxyc27GXpf02 returns true`, async () => {
  const actual = await SpotifyApi.checkIfIFollowArtist('06HL4z0CvFAxyc27GXpf02');
  expect(actual).toBeTruthy();
});

test(`/me/following/contains?type=artist&ids=77i53Qlp3vNOh4Rab2wr56 returns true`, async () => {
  const actual = await SpotifyApi.checkIfIFollowArtist('77i53Qlp3vNOh4Rab2wr56');
  expect(actual).toBeFalsy();
});

test(`/artists/06HL4z0CvFAxyc27GXpf02 returns SpotifyArtist`, async () => {
  const actual = await SpotifyApi.getArtist('06HL4z0CvFAxyc27GXpf02');
  const expected = { ...ARTIST_TAYLOR_SWIFT_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistDiscography('06HL4z0CvFAxyc27GXpf02') returns SpotifyDiscography`, async () => {
  const actual = await SpotifyApi.getArtistDiscography('06HL4z0CvFAxyc27GXpf02');
  const expected = { ...ARTIST_TAYLOR_SWIFT_DISCOGRAPHY_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistDiscography('0VCYEBxnERCSrT8NvEDLPh') returns SpotifyDiscography`, async () => {
  const actual = await SpotifyApi.getArtistDiscography('0VCYEBxnERCSrT8NvEDLPh');
  const expected = { ...ARTIST_MAZE_DISCOGRAPHY_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistLatestRelease() of Taylor Swift returns SpotifyAlbum`, async () => {
  /** @type {SpotifyDiscography} */
  // @ts-ignore
  const DISCOGRAPHY = { ...ARTIST_TAYLOR_SWIFT_DISCOGRAPHY_JSON };
  const actual = await SpotifyApi.getArtistLatestRelease(DISCOGRAPHY);
  const expected = { ...ARTIST_TAYLOR_SWIFT_LATEST_RELEASE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistLatestRelease() of Maze returns SpotifyAlbum`, async () => {
  /** @type {SpotifyDiscography} */
  // @ts-ignore
  const DISCOGRAPHY = { ...ARTIST_MAZE_DISCOGRAPHY_JSON };
  const actual = await SpotifyApi.getArtistLatestRelease(DISCOGRAPHY);
  const expected = { ...ARTIST_MAZE_LATEST_RELEASE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistTopTracks('06HL4z0CvFAxyc27GXpf02', 'FR) returns getArtistTopTracks`, async () => {
  const actual = await SpotifyApi.getArtistTopTracks('06HL4z0CvFAxyc27GXpf02', 'FR');
  const expected = [...ARTIST_TAYLOR_SWIFT_TOP_TRACKS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistTopTracks('0VCYEBxnERCSrT8NvEDLPh', 'FR) returns getArtistTopTracks`, async () => {
  const actual = await SpotifyApi.getArtistTopTracks('0VCYEBxnERCSrT8NvEDLPh', 'FR');
  const expected = [...ARTIST_MAZE_TOP_TRACKS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistTopReleases() of Taylor Swift returns SpotifyAlbum[]`, async () => {
  /** @type {SpotifyAlbum} */
  // @ts-ignore
  const LATEST_RELEASE = { ...ARTIST_TAYLOR_SWIFT_LATEST_RELEASE_JSON };
  /** @type {SpotifyTrack[]} */
  // @ts-ignore
  const TOP_TRACKS = [...ARTIST_TAYLOR_SWIFT_TOP_TRACKS_JSON];

  const actual = await SpotifyApi.getArtistTopReleases(LATEST_RELEASE, TOP_TRACKS);
  const expected = [...ARTIST_TAYLOR_SWIFT_TOP_RELEASES_JSON];

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistTopReleases() of Maze returns SpotifyAlbum[]`, async () => {
  /** @type {SpotifyAlbum} */
  // @ts-ignore
  const LATEST_RELEASE = { ...ARTIST_MAZE_LATEST_RELEASE_JSON };
  /** @type {SpotifyTrack[]} */
  // @ts-ignore
  const TOP_TRACKS = [...ARTIST_MAZE_TOP_TRACKS_JSON];

  const actual = await SpotifyApi.getArtistTopReleases(LATEST_RELEASE, TOP_TRACKS);
  const expected = [...ARTIST_MAZE_TOP_RELEASES_JSON];

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistAppearsOn('06HL4z0CvFAxyc27GXpf02', 'FR) returns SpotifyAlbum[]`, async () => {
  const actual = await SpotifyApi.getArtistAppearsOn('06HL4z0CvFAxyc27GXpf02');
  const expected = [...ARTIST_TAYLOR_SWIFT_APPEARS_ON_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getArtistRelatedArtists('06HL4z0CvFAxyc27GXpf02') returns SpotifyArtist[]`, async () => {
  const actual = await SpotifyApi.getArtistRelatedArtists('06HL4z0CvFAxyc27GXpf02');
  const expected = [...ARTIST_TAYLOR_SWIFT_RELATED_ARTISTS_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/artists?ids=2YP02JRa1JLejrg3XTssJS,0PUi9O36OMwere5DTyayAq,4ACplpEqD6JIVgKrafauzs returns SpotifyArtist[]`, async () => {
  const actual = await SpotifyApi.getSeveralArtists([
    '2YP02JRa1JLejrg3XTssJS',
    '0PUi9O36OMwere5DTyayAq',
    '4ACplpEqD6JIVgKrafauzs',
  ]);
  const expected = [...ARTISTS_SEVERAL_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/recently-played returns SpotifySong[]`, async () => {
  const actual = await SpotifyApi.getRecentlyPlayedSongs();
  const expected = [...RECENTLY_PLAYED_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getMyLibRecentlyPlayed() returns array of: SpotifyPlaylist, SpotifyAlbum, SpotifyArtist`, async () => {
  const actual = await SpotifyApi.getMyLibRecentlyPlayed();
  const expected = [...MY_LIB_RECENTLY_PLAYED_JSON];
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/me/player/queue returns SpotifyQueue`, async () => {
  const actual = await SpotifyApi.getQueue();
  const expected = { ...QUEUE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`getQueueLastSong() returns SpotifyTrack`, async () => {
  const actual = await SpotifyApi.getQueueLastSong();
  const expected = { ...QUEUE_LAST_SONG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`get last recently-played-songs returns SpotifySong`, async () => {
  const songs = await SpotifyApi.getRecentlyPlayedSongs();
  const actual = songs[0];
  const expected = { ...LAST_SONG_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`extractPlayerStateFrom(playerStateApi) returns SpotifyPlayerState`, async () => {
  /** @type {SpotifyPlayerState} */
  // @ts-ignore
  const SPOTIFY_PLAYER_STATE_API = { ...PLAYER_STATE_API_JSON };
  const actual = await SpotifyApi.extractPlayerStateFrom(SPOTIFY_PLAYER_STATE_API);
  const expected = { ...PLAYER_STATE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`transfertPlayback() not throwing exception`, async () => {
  await SpotifyApi.transfertPlayback('my-device-id-123');
});

test(`transfertPlayback() not throwing exception`, async () => {
  await SpotifyApi.transfertPlayback('my-device-id-123');
});

test(`/search?q=sherry&limit=20 returns SpotifySearch`, async () => {
  const actual = await SpotifyApi.search('sherry');
  const expected = { ...SEARCH_SHERRY_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/search?q=sherry&offset=3&limit=3 returns SpotifySearch`, async () => {
  const actual = await SpotifyApi.search('sherry', 3, 3);
  const expected = { ...SEARCH_SHERRY_OFFSET_3_LIMIT_3_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/search?q=sherry&offset=3&limit=3 with existingSpotifySearch returns an "incremented" SpotifySearch`, async () => {
  const firstResults = await SpotifyApi.search('sherry', 0, 3);
  const actual = await SpotifyApi.search('sherry', 3, 3, firstResults);
  const expected = { ...SEARCH_SHERRY_OFFSET_3_LIMIT_3_WITH_EXISTING_RESULTS_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/search?q=sherry&offset=50&limit=20 returns SpotifySearch`, async () => {
  const actual = await SpotifyApi.search('sherry', 50);
  const expected = { ...SEARCH_SHERRY_OFFSET_50_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

test(`/search?q=she&limit=20 returns SpotifySearch`, async () => {
  const actual = await SpotifyApi.search('she');
  const expected = { ...SEARCH_SHE_JSON };
  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
});

///// 🔴🔴🔴 bellow : AXIOS_INSTANCE is unmocked 🔴🔴🔴 ///////
vi.doUnmock('@js/axios-utils');

test(`can add a song to playlist`, async () => {
  const songUri = 'spotify:track:0S4dVpqBLnBFj4wdB4UDMd';
  const playlistId = '5iLCxA1kjRDD9xpLD9Ym2z';

  const spy = vi.spyOn(AXIOS_INSTANCE(), 'post');

  SpotifyApi.addSongToPlaylist(songUri, playlistId);

  expect(spy).toHaveBeenCalledWith(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    uris: [songUri],
  });
});

test(`can add a song to multiple playlists`, async () => {
  const songUri = 'spotify:track:0S4dVpqBLnBFj4wdB4UDMd';
  const playlistIds = ['3lZmcYRykUqUkjoH1tChCe', '5iLCxA1kjRDD9xpLD9Ym2z'];

  const spy = vi.spyOn(AXIOS_INSTANCE(), 'post');

  SpotifyApi.addSongToMultiplePlaylists(songUri, playlistIds);

  expect(spy).toHaveBeenCalledWith(
    `https://api.spotify.com/v1/playlists/${playlistIds[0]}/tracks`,
    {
      uris: [songUri],
    },
  );
  expect(spy).toHaveBeenCalledWith(
    `https://api.spotify.com/v1/playlists/${playlistIds[1]}/tracks`,
    {
      uris: [songUri],
    },
  );
});

test(`moveTrackInPlaylist move a track up and returns updated playlist`, async () => {
  const playlistId = '3lZmcYRykUqUkjoH1tChCe';
  const songIndex = 0;
  const newPosition = 1;
  const spy = vi.spyOn(AXIOS_INSTANCE(), 'put');
  /** @type {SpotifyTrack[]} */
  // @ts-ignore
  const TRACKS = [...PLAYLIST_OLD_ORDER_JSON];

  const actual = await SpotifyApi.moveTrackInPlaylist(playlistId, TRACKS, songIndex, newPosition);
  const expected = [...PLAYLIST_NEW_ORDER_JSON];

  expect(JSON.parse(JSON.stringify(actual))).toStrictEqual(expected);
  expect(spy).toHaveBeenCalledWith(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    range_start: songIndex,
    insert_before: newPosition,
  });
});

test(`can add track in liked playlist`, async () => {
  const trackId = '36ylDwMUz1EqrdbfBF8vC7';
  const spy = vi.spyOn(AXIOS_INSTANCE(), 'put');

  SpotifyApi.likeTrack(trackId);

  expect(spy).toHaveBeenCalledWith(`https://api.spotify.com/v1/me/tracks`, {
    ids: [trackId],
  });
});

test(`can remove track from liked playlist`, async () => {
  const trackId = '36ylDwMUz1EqrdbfBF8vC7';
  const spy = vi.spyOn(AXIOS_INSTANCE(), 'delete');

  SpotifyApi.unlikeTrack(trackId);

  expect(spy).toHaveBeenCalledWith(`https://api.spotify.com/v1/me/tracks`, {
    data: {
      ids: [trackId],
    },
  });
});

test(`can rename playlist`, async () => {
  const playlistId = '4RF7mw2Acseouq7QOnaVi3';
  const newName = 'my new playlist name';
  const spy = vi.spyOn(AXIOS_INSTANCE(), 'put');

  SpotifyApi.updatePlaylistName(playlistId, newName);

  expect(spy).toHaveBeenCalledWith(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    name: newName,
  });
});

test(`can create playlist`, async () => {
  const userId = 'benjamin59';
  const name = 'my playlist name';
  const spy = vi.spyOn(AXIOS_INSTANCE(), 'post');

  SpotifyApi.createPlaylist(userId, name);

  expect(spy).toHaveBeenCalledWith(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    name,
  });
});
