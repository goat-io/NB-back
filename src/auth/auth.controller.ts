import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'
import { getModelSchemaRef } from '@loopback/rest'
import { Controller, Get, HttpException, HttpStatus, Req } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { Request } from 'express'
import { UsersService } from './user/user.service'
import { UserDtoIn, UserDtoOut } from './user/user.dto'
import { GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { For } from '@goatlab/fluent/dist/Helpers/For'
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private users: UsersService
  constructor() {
    this.users = new UsersService()
  }
  @Get('/me')
  @Auth.protect()
  @ApiResponse({
    status: 200,
    description: 'The created user',
    content: {
      'application/json': { schema: getModelSchemaRef(UserDtoOut) },
    },
    isArray: false,
    type: UserDtoOut,
  })
  async getUser(
    @Req() request: Request,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    // TODO create union type with User
    const req = request as any

    if (!req.user.phone_number) {
      throw new HttpException('JWT has no phone number', HttpStatus.BAD_REQUEST)
    }

    const [error, User] = await For.async(
      this.users.where(this.users._keys.id, '=', req.user.phone_number).get(),
    )

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (!User[0]) {
      const [createError, newUser] = await For.async(
        this.users.insert({ name: '', email: '' }, req.user.phone_number),
      )

      if (createError) {
        throw new HttpException(
          createError.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }

      return newUser
    }

    return User[0]
  }
}
