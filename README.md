# spotify-mobile-svelte

A clone of Spotify mobile app, in svelte 🚀

Demo: https://spotify-mobile-svelte.vercel.app/

# TODO

## MVP

- feat(spotify-api): can: play a song, move to next/previous track !
- refactor(general): refactor all my code

## MAIN SCREENS

- list all screens
- feat(home): design
- feat(player): design
- feat(search): design
- feat(mylib): design
- feat(queue): design
- feat(detail): design

## SPOTIFY API

- postman first call

## DEMO

- how to test on mobile/desktop ?
- feat(>iphone): make responsive for desktop ?

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
