# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/

# philosophie ⚜️

KISS
DRY

# TODO

## MVP

✅✅✅ OBJECTIF DU JOUR ✅✅✅

// FIXME axios return jsdoc

- feat(player): synchronize shuffle & repeat
- feat(player): auto-synchronize
  ==> when play next previous
  ==> isPlaying still useful ?
  ==> // FIXME SpotifyStatus
  ==> // FIXME context_uri: uri,
  ==> transformers // TODO move in transformers ???
  ==> resolve last FIXME
  ==> resolve last TODO

- feat(player): what is default queue ?

- refactor(project-structure): move SpotifyRepeatState & SpotifyStatus

- feat(player): can view progress
- position fixed : player & menu
- feat(navigation): improve player & menu
- +end content height === player + nav
- refactor: WYSIWYG
- **FEAT(LAYOUT): IMPLEMENT STACK VIEWS**
- feat(layout): one stack views by `route`
- resolve child, grand-child etc...
- feat(button): onTap ?

HARD

- utiliser le view transition API à la "svelte menu"
- how to make bi-directionnel player ????
  ==> how to listen to push ?
  🎉🎉🎉 FIN 🎉🎉🎉

- feat(mylib): design
- feat(mylib): can select other song

- feat(search): design
- feat(queue): design
- feat(detail): design
- feat(loading): which device
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

## bonus

- feat(loading) : add spotify logo (ball)
- test(tool): use `vitest` ?
- pause écouteurs bluetooth ?
- make scroll lib by date ?
- make vibration
- fix(js): `removeEventListener` on store localStorage => works ???
- 🟢//learn.svelte.dev/tutorial/updating-arrays-and-objects
  "...won't trigger reactivity on obj.foo.bar, unless you follow it up with obj = obj"
- use svelte `animation` ?

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
