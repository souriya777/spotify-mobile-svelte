# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/

# philosophie ⚜️

KISS
DRY

# TODO

## MVP

✅✅✅ OBJECTIF DU JOUR ✅✅✅

- factorize Spotify error management
- implement JSDoc basic
- use typecheck's method from svelte ?
- feat(player): can play last song
- feat(player): can shuffle
- feat(player): can repeat
- feat(player): can repeat single song
- feat(player): can view progress
- refactor(phonetime): use `readable` from svelte
- refactor(svelte): use `bind:online`
- refactor(svelte): use `bind:this`
- refactor(svelte): use `custom-store`
- refactor(svelte): use `store-binding`
- refactor(js): where can I use `optional chaining` ?
- refactor(js): where can I use `nullish coalescing` ?
- refactor(js): where can I use `generator yield` ?
- feat(button): onTap ?
- position fixed : player & menu
- feat(navigation): improve player & menu
- +end content height === player + nav
- refactor: WYSIWYG
- utiliser le view transition API à la "svelte menu"
- **FEAT(LAYOUT): IMPLEMENT STACK VIEWS**
- feat(layout): one stack views by `route`
- resolve child, grand-child etc...
  🎉🎉🎉 FIN 🎉🎉🎉

- feat(search): design
- feat(mylib): design
- feat(queue): design
- feat(detail): design
- feat(loading): which device
- feat(login)

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
