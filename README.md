# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/
Beta: https://spotify-mobile-svelte-test.vercel.app/

# philosophie ⚜️

KISS
DRY
ACID
Single Source of Truth

# TODO MVP

- fix(scroll): bug when slide
- feat(router): router or not router ?
- feat(router): each route has its own stack
- feat(progress-bar): make spotify-like component

- feat(stack-ui): change background-color depending on view
  -- works :) => make it independent
- feat(player) : shuffle on several playlist
- feat(ui): like "car mode" ?
- feat(button): onTap ?
- feat(ui): use use:onTap
- position fixed : player & menu
- +end content height === player + nav
- utiliser le view transition API à la "svelte menu"
- implement <ProgressBar>
- feat(player): can seek position by drag'n'drop progress bar
- feat(ui): add waiting visual indication when fetching is too long
- feat(mylib): can select other song
- feat(search): design
- feat(queue): design
  -- feat(player): what is default queue ?
  -- extract track_window next_tracks ?
- feat(detail): design
- space
- color
- feat(cache): find a strategy
  -- how knowing which track are contained in liked playlist ?
  -- invalid cache, when rename playlist
  -- invalid cache, when create playlist
- feat(cache): optimize it
- feat(service-worker): invalidate when add like song ?
- feat(whaou): use transition https://www.youtube.com/watch?v=q_2irZO4SS8
- feat(ui): drag'n drop
- feat(pwa): improve "add to homescreen" installation message
- lazy-load view in order to optimize processing ?
- how puting `karaoke` at first ?
- feat(service-worker): automate `swVersion` when building app ?
- force refresh by reload '/'
- found in code where can I use `isEmpty` from `string-utils`
- reflect a "car" presentation (audible-like)
- test `synchronize`... hard...
- TODO feat(store): refactor store in multiple files
- ERRORS feat(spotify-api): implement quota-limit with code `429`
- TODO/FIXME uncomment
- feat(app): add a direct shortcut
- feat(logout): can logout
- feat(ui): one stack views by `route` ? use Router.svelte ?
- feat(browser): manage back search (no dependent of char by char input)
- can't delete playlist...
- playwrite to ket "pinned" or "sort" functionnality (mathieu) ? https://playwright.dev/docs/running-tests
- fix in `SpotifyApi.test.js`
  `const actual = await SpotifyApi.extractPlayerStateFrom({ ...PLAYER_STATE_API_JSON });`
- feat(player): can manage other players
- fix(spotify-connect): only a single instance in devices...
- 🚀 EXTRA : tag liked songs
- 🚀 EXTRA : shuffle from all playlist
- feat(player): load song in advance ?
- test-unit on CI
- feat(loading) : add spotify logo (ball)
- pause écouteurs bluetooth ?
- make scroll lib by date ?
- feat(desktop): do something with `Phone.svelte` & `PhoneScreen.svelte`
- feat(ux): can I have native vibration ? (eg. move song in queue)
- feat(player): move `$player.activateElement()` elsewhere (because we want to auto-sync without clicking)
- make vibration
- FIXME https://jariz.github.io/vibrant.js/
- fix(js): `removeEventListener` on store localStorage => works ???
- 🟢//learn.svelte.dev/tutorial/updating-arrays-and-objects
  "...won't trigger reactivity on obj.foo.bar, unless you follow it up with obj = obj"
- use svelte `animation` ?
- // TODO refactor in smaller function or custom stores ?
- spotify bug "recently-added" order
- implement accessibility (eg. `aria-hidden`)

# TODO perf++

- manage `429` cases => when someone has a lot of playlists, or have a lots of songs in playlists
- feat(service-worker): strategy `what`, `when`
- feat(realtime) : sync when ?
- lazy load images
- fix `BetaLikedImg`
- lighthouse

# TODO expert-like

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

Has 2 APIs : one PUBLIC (`api.spotify.com/v1`) & one PRIVATE (`api-partner.spotify.com/pathfinder/v1/query`).

Note for `private` API :

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
