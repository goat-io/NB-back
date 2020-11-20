import { Global, Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { GoatStrategy } from '@goatlab/fluent/dist/core/Nestjs/Auth/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from './user/user.module'

@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
  ],
  providers: [GoatStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
