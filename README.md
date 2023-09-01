# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/

# philosophie ⚜️

KISS
DRY
No broken windows
Stone soup

# TODO

## mvp

✅✅✅ GOAL : MOST API CALLS ✅✅✅

- TODO refactor store in multiple files
- feat(player): autoplay when click on next/previous
- resolve bug when batch play/pause button

- refactor(namming): rename "Spotify\*"
- feat(player): what is default queue ?
- feat(player): can set volume of device
- feat(player): merge sync-playbackstate & sync-track ? (redundant infos)
- feat(player): can manage other players
- test fiability of player

- sync : what and when ?
  -- sync playbackState
  -- sync device
  -- transfert state
  ---- at the end of song
  ---- next/prev ?
  ---- few actions ARE NOT possible when not transfert-playback

ERRORS

- FIXME fix when long-time-inactivity ""Request failed with status code 400"
- TODO transfert state (after 400 error)
- FIXMEfeat(spotify-api): implement quota-limit with code `429`

✅✅✅ ------------- ✅✅✅

- reflect a "car" presentation (audible-like)
- position fixed : player & menu
- feat(navigation): improve player & menu
- +end content height === player + nav
- refactor: WYSIWYG
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
- feat(login)

- improve cursor concept

- space
- color
- px

## perf

- lazy load images
- lighthouse

## demo

- TODO/FIXME uncomment
- how to test on mobile/desktop ?
- feat(>iphone): make responsive for desktop ?
- feat(app): add a direct shortcut
- present it to `Svelte Society`
- make article
- live coding

## bonus

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

1. GET /authorize => authorization code
2. GET /token => access token + refresh token
3. GET /me => user id (useful for getting my playlists)
   benefits: it you receive `401`, you know that your previous `access_token` is obsolete

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
