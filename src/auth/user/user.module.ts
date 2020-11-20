import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UsersService } from './user.service'

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
