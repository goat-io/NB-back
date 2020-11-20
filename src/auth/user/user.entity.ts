import { Decorators } from '@goatlab/fluent/dist/core/Nestjs/Database/decorators'

@Decorators.entity('users')
export class User {
  @Decorators.id()
  id: string

  @Decorators.property({ required: false })
  email?: string

  @Decorators.property({ required: false })
  name?: string
}
