## Cryptocurrency-wallet
A basic BTC wallet based on Nodejs and [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)

## Setup project

```
 cp frontend/.env.example frontend/.env
 cp backend/.env.example backend/.env
```

## Default for env for development

```
## frontend/.env

REACT_APP_GRAPHQL_URI=http://localhost:8080/graphql
REACT_APP_GRAPHQL_SUB=ws://localhost:8080/subscriptions
```

```
## backend/.env
PORT=8080
EXPIRES_TIME="1d"
testnet="testnet"
SECRET_KEY="secretkey"
MONGODB_URI="mongodb://localhost:27017/cryptocurrency-wallet"
```


## Commands:
- `docker-compose up -d`: to start mongo db from docker
- `yarn dev`: to run frontend for development
- `yarn server`: to run backend for development

## Troubleshootings

[...]
