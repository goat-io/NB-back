import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database.module'
import { AuthModule as GoatAuth } from './auth/auth.module'
import { GoatModules } from '@goatlab/fluent/dist/core/Nestjs/GoatApp'
import { Module } from '@nestjs/common'
import { UsersModule } from './auth/user/user.module'
import { join } from 'path'

const Health = GoatModules[2]
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          rootPath: join(__dirname, '../../'),
        }),
      ],
    }),
    Health,
    UsersModule,
    GoatAuth,
  ],
})
export class NCApp {}
