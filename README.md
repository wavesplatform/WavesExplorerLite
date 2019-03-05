# Waves Explorer

Waves Blockchain Explorer

# Demo

Demo is available on https://wavesexplorer.com

# Setup

Install [NodeJS](https://nodejs.org/en/download/)

Install [yarn](https://yarnpkg.com/lang/en/docs/install/)

Install gulp:
```
yarn add -g gulp-cli
```

# Run locally

```
yarn install 
yarn start
```

Your browser will open local version of Waves Explorer automatically.

# Build

Build process creates ./dist directory with Waves Explorer distribution that supportes mainnet, testnet and a custom network. 
To create the distribution, run:
```
gulp build-official
```

# Deployment

## Prerequisites
To enable deployment you need to provide access keys from Amazon S3. This is done via environment variables that need to be set before deployment script is invoked.
* EXPLORER_AWS_ACCESS_KEY_ID - access key ID
* EXPLORER_AWS_ACCESS_SECRET - access key secret

See Amazon S3 access for further details. These values **SHOULD NEVER** be stored in git repo.

## Commands
Deployment is automated via publish task, which is quite smart to upload only changed files since the last deployment.
By default publish will deploy each configuration to their corresponding location on Amazon S3.

To deploy official explorer to staging, run:
```
gulp publish-official-staging
```
To deploy official explorer to production, run:
```
gulp publish-official-prod
```
Deploy script will automatically build the project and deploy selected configuration.
