  <p align="center">Natural Cycles - Challenge</p>

## Description and Features

- Built with [Nest.JS](https://github.com/nestjs/nest)
- Uses [Fluent](https://github.com/goat-io/fluent) as ORM
- and [Firebase](https://firebase.google.com) as Database

## Installation

```bash
$ yarn
```

## Running the app

- Generate and include your Service Account JSON file.

- Copy the `.env.example` file to `.env` and fill out your environment variables. Then, run the following commands:

```bash
# Run the server in development mode
$ yarn start

# or in production mode
$ yarn start:prod
```

- Don't forget to change the DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH env variable, with the name and location of your service account

```bash
DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH=./my-service-account.json
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

[MIT licensed](LICENSE).
