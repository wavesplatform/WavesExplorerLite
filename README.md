# Waves Explorer

Waves Blockchain Explorer is available on https://wavesexplorer.com

## Setup

Install [NodeJS](https://nodejs.org/en/download/)

Install [yarn](https://yarnpkg.com/lang/en/docs/install/)

Install gulp-cli:
```
yarn global add gulp-cli
```

## Run locally

From the project directory run:

```
yarn install 
yarn start
```

Your browser will open local version of Waves Explorer automatically.

## Build

Build process creates ./dist directory with Waves Explorer distribution that supports mainnet, testnet and a custom network. 
To create the distribution, run from the project directory:
```
gulp buildOfficialProd
```
