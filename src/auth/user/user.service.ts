import { UserDtoIn, UserDtoOut, UserDtoPatch } from './user.dto'

import { FirebaseConnector } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseConnector'
import { User } from './user.entity'

export class UsersService extends FirebaseConnector<
  User,
  UserDtoIn,
  UserDtoOut
> {
  constructor(relations?: any) {
    super(User, relations)
  }
  /**
   *
   * @param input
   */
  validatePatch(profile: UserDtoPatch): string | undefined {
    const isValidEmail = (email: string) => {
      const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }

    const hasEmail = typeof profile.email === 'string'
    const hasName = typeof profile.name === 'string'

    if (hasName && profile.name === '') {
      return 'Name can´t be empty'
    }

    if (hasEmail && profile.email === '') {
      return 'Email can´t be empty'
    }

    if (hasEmail && !isValidEmail(profile.email)) {
      return 'Email is not valid'
    }
  }
}
