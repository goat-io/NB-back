import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'

@Injectable()
export class OwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { url, handlerName, user } = Auth.parseContext(context)

    if (handlerName === 'updateById') {
      const userId = url.split('/users/')[1]

      return userId === user.phone_number
    }
    return false
  }
}
