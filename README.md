# Server Side Rendering Boilerplate POC

## To set everything up at once, you can run `quick_start.sh`.

This repo contains three folders, `eosio_docker`, `app` and `server`:

## eosio_docker

`eosio_docker` contains everything needed to set up the local blockchain containing the `notechain` application.

## app
`app` contains a Next.js / Redux app with a few pages showing some different features, including:
- server side rendering
- server side data population with `getInitialProps`
- use of Redux / Redux Saga with Next.js
- styled components with SSR
- dynamically loaded components
- authentication with JWT

To run the front end, `cd app` and then run `yarn dev`.

## server

`server` contains an Express app. Only `app.js` is currently in use. It allows the front end to request a JWT and authenticates user ping attempts.

To run the back end. `cd server` and then run `yarn start`.
