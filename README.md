# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/

# TODO

## prototype

- position fixed : player & menu
- feat(navigation): improve player & menu
- +end content height === player + nav
- refactor: WYSIWYG
- utiliser le view transition API à la "svelte menu"
- **feat(layout): implement stack views**

- feat(layout): one stack views by `route`
- feat(button): onTap ?
- init JSDoc

- feat(search): design
- feat(mylib): design
- feat(queue): design
- feat(detail): design
- feat(loading): which device
- feat(login)

- feat(loading) : add spotify logo (ball)
- space
- color
- px

## spotify api

- postman first call

## perf

- lazy load images

## demo

- TODO uncomment
- how to test on mobile/desktop ?
- feat(>iphone): make responsive for desktop ?
- feat(app): add a direct shortcut

## bonus

- make scroll lib by date ?
- make vibration
- fix(js): `removeEventListener` on store localStorage => works ???

# spotify flow

1. GET /authorize => authorization code
2. GET /token => access token + refresh token
3. GET /me => user id (useful for getting my playlists)

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
