  <p align="center">Natural Cycles - Challenge</p>

## Description and Features

- Built with [Nest.JS](https://github.com/nestjs/nest)
- [Fastify](https://www.fastify.io/) as base node framework
- [Helmet](https://github.com/fastify/fastify-helmet) to secure the HTTP(s) requests
- [Fluent](https://github.com/goat-io/fluent) as ORM
- and [Firebase](https://firebase.google.com) as Database
- Deployed using [Google App Engine](https://cloud.google.com/appengine)

## Installation

```bash
$ yarn
```

## Running the app

- Generate and include your Service Account JSON file.

- Copy the `.env.example` file to `.env` and fill out your environment variables. Then, run the following commands:

```bash
# Run the server in development mode
$ npm run start:dev

or

# Run the server in development mode
$ yarn start:dev
```

- Don't forget to change the DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH env variable, with the name and location of your service account

```bash
DATABASE_FIREBASE_SERVICE_ACCOUNT_PATH=./my-service-account.json
```

## Test

```bash
# Run all tests
$ npm run test

or

$ yarn test
```

## Firebase Database

![image](https://user-images.githubusercontent.com/48744933/99883000-a7c3bd80-2c24-11eb-889e-73a69b6bb3c6.png)

## License

[MIT licensed](LICENSE).
