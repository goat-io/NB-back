// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AllExceptionsFilter } from '@goatlab/fluent/dist/core/Nestjs/http-exceptions.filter'
import { Fluent } from '@goatlab/fluent/dist/Fluent'
import { NestFactory } from '@nestjs/core'
import { PackageInfo } from '@goatlab/fluent/dist/core/Loopback/goat'
import { User } from './auth/user/user.entity'
import helmet from 'fastify-helmet'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const pkg: PackageInfo = require('../package.json')

let app: NestFastifyApplication

async function bootstrap() {
  const entities = [User]
  await Fluent.models(entities)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { NCApp } = require('./application')
  app = await NestFactory.create<NestFastifyApplication>(
    NCApp,
    new FastifyAdapter(),
  )
  app.register(helmet, {
    // Disabled just to show Swagger
    contentSecurityPolicy: false,
  })
  /**
   * Enable Swagger
   */
  const options = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addServer(`http://localhost:${process.env.PORT}`)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'token',
    )
    .build()
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()
  app.enableShutdownHooks()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('explorer', app, document, {})
  /**
   * Start the app
   */
  await app.listen(parseInt(process.env.PORT), '0.0.0.0')
}

bootstrap()
