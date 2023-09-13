# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/

# philosophie ⚜️

KISS
DRY
ACID
ETC (Easier To Change) : decoupling, single responsability principle
No broken windows
Stone soup

# TODO

## mvp

- LIST MOST API CALLS
- feat(service-worker): test on mobile
- feat(service-worker): force reload of `service-workers`... how ? => activate it
- feat(service-worker): invalidate when like song ?
- feat(spotify): can get all playlists sorted `recently-added`
- feat(spotify): can get all playlists sorted `last-played`
- feat(spotify): can get all albums sorted alphabetically
- feat(spotify): can get all albums sorted `recently-added`
- feat(spotify): can get all albums sorted `last-played`
- feat(spotify): can sort song by `added_date`
- feat(spotify): can sort song by `title`
- feat(spotify): can sort song by `artist`
- feat(spotify): can sort song by `album` ???
- feat(spotify): can search a song/artist/album/playlist
- feat(spotify): can add song to playlist
- feat(spotify): can liked a song
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):
- feat(spotify):

- feat(sync) : when ?

- use use:onTap
- position fixed : player & menu
- feat(navigation): improve player & menu
- +end content height === player + nav
- StackUIManager FIXME
  FEAT(LAYOUT): IMPLEMENT STACK VIEWS
- feat(layout): one stack views by `route`
- resolve child, grand-child etc...
- feat(button): onTap ?
  TRANSITION
- utiliser le view transition API à la "svelte menu"
- implement <ProgressBar>
- feat(player): can seek position by drag'n'drop progress bar

- feat(mylib): design
- feat(mylib): can select other song
- feat(search): design
- feat(queue): design
  -- feat(player): what is default queue ?
  -- extract track_window next_tracks ?
- feat(detail): design

- feat(spotify): can load next songs
- feat(spotify): can load next playlists

- space
- color
- px

## perf

- lazy load images
- lighthouse

## demo

- found in code where can I use `isEmpty` from `string-utils`
- move `$player.activateElement()` elsewhere (because we want to auto-sync without clicking)
- reflect a "car" presentation (audible-like)
- test `synchronize`... hard...
- TODO test ?
- TODO feat(store): refactor store in multiple files
- ERRORS feat(spotify-api): implement quota-limit with code `429`
- TODO/FIXME uncomment
- how to test on mobile/desktop ?
- feat(>iphone): make responsive for desktop ?
- feat(app): add a direct shortcut
- present it to `Svelte Society`
- make article
- live coding

## bonus

- feat(player): can manage other players
- fix(spotify-connect): only a single instance in devices...
- TODO do I use refresh_token ?
- 🚀 EXTRA : tag liked songs
- 🚀 EXTRA : shuffle from all playlist
- feat(player): load song in advance ?
- test-unit on CI
- feat(loading) : add spotify logo (ball)
- pause écouteurs bluetooth ?
- make scroll lib by date ?
- make vibration
- fix(js): `removeEventListener` on store localStorage => works ???
- 🟢//learn.svelte.dev/tutorial/updating-arrays-and-objects
  "...won't trigger reactivity on obj.foo.bar, unless you follow it up with obj = obj"
- use svelte `animation` ?
- // TODO refactor in smaller function or custom stores ?

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
