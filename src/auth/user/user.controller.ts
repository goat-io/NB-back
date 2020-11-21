import {
  Controller,
  Param,
  Body,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'

import { UserDtoOut, UserDtoIn, UserDtoPatch } from './user.dto'
import { getModelSchemaRef } from '@loopback/rest'

import { GoatOutput } from '@goatlab/fluent/dist/Providers/types'
import { For } from '@goatlab/fluent/dist/Helpers/For'
import { UsersService } from './user.service'
import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'
import { OwnerGuard } from './owner.guard'
@ApiTags('Users')
@Controller('users')
export class UserController {
  private users: UsersService
  constructor() {
    this.users = new UsersService()
  }
  /**
   *
   * @param id
   * @param form
   */
  @Patch(':id')
  @Auth.protect(OwnerGuard)
  @ApiResponse({
    status: 200,
    description: 'The patched user',
    content: {
      'application/json': { schema: getModelSchemaRef(UserDtoOut) },
    },
    isArray: false,
    type: UserDtoOut,
  })
  @ApiBody({
    description: 'User',
    type: UserDtoIn,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  async updateById(
    @Param('id') id: string,
    @Body() profileInfo: UserDtoPatch,
  ): Promise<GoatOutput<UserDtoIn, UserDtoOut>> {
    const inputError = this.users.validatePatch(profileInfo)

    if (inputError) {
      throw new HttpException(inputError, HttpStatus.BAD_REQUEST)
    }

    const [error, user] = await For.async(
      this.users.updateById(id, profileInfo),
    )

    if (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND)
    }

    return user
  }
}
