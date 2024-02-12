# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/
Beta: https://spotify-mobile-svelte-test.vercel.app/

# philosophie ⚜️

KISS
DRY -> Single Source of Truth

# MVP TODO

- FEAT(PLAYLIST/PLAYLIST-DETAIL): ADOPT OLD CODE TO NEW
  -- feat(my-lib): change background meta color based on "navigating rgb"
- feat(my-lib): tune UI
- fix(search): can search like old code
- fix(search): remove `ListFilterSAVE`
- feat(search): manage back search in browser (no dependent of char by char input)
- feat(album-detail): can view details
- feat(album-detail): can play a song
- remove `Collection*`
- 🥳🥳🥳🥳🥳 check : `refactor` in `main` ????

- perf : mv sync my-lib from `onMount`

- feat(artist-detail): ui
- feat(artist-detail): ux
- feat(artist-detail): js
- fix(playlist): spotify bug "recently-added" order
  -- see <RenamePlaylist playlistId={list?.id} playlistName={list?.name} />
- feat(playlist): can favorite song
- feat(album): can remove album from my favorite
- feat(album): can favorite song
- feat(liked-song): which api call to know if a song is in favourite ?
- feat(liked-song): can unlike song
- feat(search): can favourite playlist
- feat(search): can favourite album
- feat(search): can favourite song
- feat(playlist): can delete playlist
- feat(playlist): can rename playlist

- feat(search): tune it
- feat(playlist): can add to queue
- feat(album): can add to queue
- feat(queue): design it
- feat(queue): what is default queue ?
- feat(queue): can remove song
- feat(queue): can clear queue
- feat(queue): extract track_window next_tracks ?
- feat(queue): can auto-load queue
- feat(queue): swiper shortcut "add to queue" ???

- feat(list-playlist): make api call for playlist cover
  -- replace grid-mode image with playlist cover
- feat(playlist): what to do with secondary actions ? `CollectionTrackSECONDARY_ACTIONS.svelte`
- when drag progress, why /me/player/devices is called ????
- feat(scroll): make beautiful scroll indicator
- feat(nav): even if I click twice on nav-item, it bounce
- feat(device): can switch device `ChangeDevice.svelte`
- feat(device): disconnect other player to make it more robust
- feat(device): can manage other players
- feat(playlist/album): scroll snap on image go next song
- feat(menu): design it
- feat(menu): useview transition API as "svelte.dev menu"
- feat(router): one stack views by `route` ? use Router.svelte ?
- feat(app): add a direct shortcut
- feat(logout): can logout
- feat(player): pause écouteurs bluetooth ?
- fix(spotify-connect): only a single instance in devices...
- feat(player): load song in advance ?
- feat(player): move `$player.activateElement()` elsewhere (because we want to auto-sync without clicking)
- feat(desktop): do something with `Phone.svelte` & `PhoneScreen.svelte`

- what to do with `Notification.svelte` ?
- //learn.svelte.dev/tutorial/updating-arrays-and-objects
  "...won't trigger reactivity on obj.foo.bar, unless you follow it up with obj = obj"
- fix(eslint): resolve problems shown in vscode
- fix in `SpotifyApi.test.js`
  `const actual = await SpotifyApi.extractPlayerStateFrom({ ...PLAYER_STATE_API_JSON });`
- fix `BetaLikedImg`
- TODO/FIXME uncomment
- in SpotifyApi => `// FIXME sometimes we have error
// [spotify-player.js]: Failed to perform playback: Cannot perform operation; no list was loaded.`
- ux(loading) : add spotify logo (ball)
- ui(accessibility): implement accessibility (eg. `aria-hidden`) ?
- -- refactor: detailImage => <NoteSvg size={64} />
- refactor(aria): remove all `role="button"` ?
- refactor(solver): remove old solver
- refactor(button): use use:onTap
- refactor(string-utils): found in code where can I use `isEmpty` from `string-utils`
- refactor(fonts): group fonts together by size
- perf(list): spotify endpoint `/me/albums` is very slow...
- perf(list): move liked track loading elsewhere ? (`MyLibView`)
- perf(user-profile): picture in cache ?
- perf(user-profile): user info in cache ?
- perf(api): ERRORS feat(spotify-api): implement quota-limit with code `429`
- perf(song): auto-load prev/next song
- perf(clean): clean all listeners
- perf(clean): clean all observers
- perf(img): lazy load images
- perf(img): in service-worker ?
- perf(lazy-load): view in order to optimize processing ?
- perf: manage `429` cases => when someone has a lot of playlists, or have a lots of songs in playlists
- perf(realtime) : sync when ?
  -- when play track in a playlist, I have to sync to have animated-equalizer appears... ($playerStateTrackUri === uri)
- perf(service-worker): strategy `what`, `when`
- perf(cache): find a strategy
  -- how knowing which track are contained in liked playlist ?
  -- invalid cache, when rename playlist
  -- invalid cache, when create playlist
- perf(cache): optimize it
- perf(service-worker): invalidate when add like song ?
- ci(service-worker): automate `swVersion` when building app ?

# ALPHA

- 🚀 EXTRA : tag liked songs
- 🚀 EXTRA : shuffle from all playlist
- feat(options): design it
- feat(ux): can I have native vibration ? (eg. move song in queue)
- fix(js): `removeEventListener` on store localStorage => works ???
- use svelte `animation` ?
- lighthouse
- perf(player): stop observing scrolling-title when not visible ?
- feat(whaou): use transition https://www.youtube.com/watch?v=q_2irZO4SS8
- feat(pwa): improve "add to homescreen" installation message

# BETA

- deploy on PROD too
- player-mini: when swipe up, swipe player-full ?
- playlist-duration : we have to sum up all track's duration...

# BONUS TODO expert-like

- answer https://stackoverflow.com/questions/70540783/spotify-playlist-items-sorting-mechanism-in-web-api
- present it to `Svelte Society`
- make article
- live coding

# spotify flow

## check token validity

0. GET /me => if `401` the `access_token` is obsolete
   => force `authentication flow`

## authentication flow

1. GET /authorize => `authorization code` in `redirect URL`
2. GET /token => `access_token`
3. `new Spotify.Player()`, then `player.connect()` => if `ready`, obtain a `device_id` & `player` (we can interact with `play()`, `seek()`)

WHEN SYNC :
after transfert-playback
--> sync : hack settimeout set device

## player flow

`synchronize(spotifyPlayerState)`
--> if `spotifyPlayerState`, we extract `playbackState` & `track`(from`playbackState`, `queue`or`recently-played`)
--> otherwise, we call api

if `204` => `playback not available or active` (when no device playing something), we `transfert-playback` to us

# spotify

Has 2 APIs : one PUBLIC (`api.spotify.com/v1`) & one PRIVATE (`api-partner.spotify.com/pathfinder/v1/query` & `https://open.spotify.com/get_access_token` => CORS issue).

Note for `private` API:

- Some operation, like `sorting playlist`, are unavailable in PUBLIC API... So we can't have exactly the same functionnalities or results as `native client spotify` or `web player spotify`
- "pinning" a playlist is unvailable too

# commit message

- `build` : changements qui affectent le système de build ou des dépendances externes (npm, make...)
- `ci` : changements concernant les fichiers et scripts d'intégration ou de configuration (Travis, Ansible, BrowserStack...)
- `feat` : ajout d'une nouvelle fonctionnalité
- `fix` : correction d'un bug
- `perf` : amélioration des performances
- `refactor` : modification qui n'apporte ni nouvelle fonctionalité ni d'amélioration de performances
- `style` : changement qui n'apporte aucune alteration fonctionnelle ou sémantique (indentation, mise en forme, ajout d'espace, renommante d'une variable...)
- `docs` : rédaction ou mise à jour de documentation
- `test` : ajout ou modification de tests

```

# tech

- optimize with chrome
  -- view transition API (chrome)
  -- offline API ?
- own simple router (`<svelte:component>`)
```

# RUN

`pnpm dev`

# HELP

webapp more like native
https://medium.com/swlh/how-you-can-develop-progressive-web-apps-that-feel-native-5110fbbcbf4b

keep screen active (unlocked) on chrome
https://chromestatus.com/feature/4636879949398016

no-sleep-screen: no hack works with svelte PWA in standalone mode, on iOS
