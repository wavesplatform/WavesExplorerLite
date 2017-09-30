# Waves Explorer Lite

Waves Testnet Blockchain Explorer

# Demo

Demo is available on http://testnet.wavesexplorer.com

# Setup

Install [NodeJS](https://nodejs.org/en/download/)

Install gulp:
```
npm install -g gulp-cli
```

# Run localy

npm install

node server.js

Open http://localhost:3000 in browser. You'll see testnet version of explorer.

# Build

Build process creates ./distr directory for testnet, mainnet and devnet explorer configurations. 
To create distribution, run:
```
gulp distr
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

To deploy testnet version run:
```
gulp publish-testnet
```
To deploy mainnet version run:
```
gulp publish-mainnet
```
Deploy script will automatically build the project and deploy selected configuration.
