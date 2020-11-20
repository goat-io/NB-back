import { InputType, PartialType } from '@nestjs/graphql'

import { OmitType } from '@nestjs/swagger'
import { User } from './user.entity'

@InputType()
export class UserDtoOut extends OmitType(User, [] as const) {}

@InputType()
export class UserDtoIn extends OmitType(User, ['id'] as const) {}

@InputType()
export class UserDtoPatch extends PartialType(UserDtoIn) {}
