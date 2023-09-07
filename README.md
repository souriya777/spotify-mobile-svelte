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

✅✅✅ GOAL : PLAYER/PROGRESS CLEAN ! ✅✅✅
✅✅✅ GOAL : MOST API CALLS ✅✅✅

- add previous offset
- fix(player): multiple play/pause offset
- feat(player): autoplay when click on next/previous
- resolve bug when batch play/pause button

- feat(player): can set volume of device
- feat(player): merge sync-playbackstate & sync-track ? (redundant infos)
- feat(player): can manage other players
  ====> just `synchronize()`
  -- `/repeat` or `/shuffle` => we can set `device_id`
- SYNC : what and when ?
  -- sync playbackState
  -- sync device
  -- transfert state
  ---- at the end of song
  ---- next/prev ?
  ---- few actions ARE NOT possible when not transfert-playback

✅✅✅ ------------- ✅✅✅

// TODO extract track_window next_tracks

- FIXME bug : no sound in `svelte.iph.safari`
- feat(player): what is default queue ?
- feat(login) => resolve multiple-cloned-device ?

- reflect a "car" presentation (audible-like)
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
- feat(detail): design

- improve cursor concept

- space
- color
- px

## perf

- lazy load images
- lighthouse

## demo

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
