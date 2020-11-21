import { Fluent } from '@goatlab/fluent/dist/Fluent'
import { User } from './user.entity'
import { UsersService } from './user.service'
jest.setTimeout(3 * 60 * 1000)

describe('Test User profile validation', () => {
  let users: UsersService

  beforeAll(async () => {
    await Fluent.models([User])
    users = new UsersService()
  })

  it('Should validate empty email', () => {
    const noEmailProfile = {
      email: '',
      name: 'MyName',
    }
    const validate = users.validatePatch(noEmailProfile)
    expect(validate).toBe('Email can´t be empty')
  })

  it('Should validate invalid email', () => {
    const invalidEmailProfile = {
      email: 'cabre@c',
      name: 'MyName',
    }
    const validate = users.validatePatch(invalidEmailProfile)
    expect(validate).toBe('Email is not valid')
  })

  it('Should validate empty name', () => {
    const noEmailProfile = {
      email: 'cabrera@gmail.com',
      name: '',
    }
    const validate = users.validatePatch(noEmailProfile)
    expect(validate).toBe('Name can´t be empty')
  })

  it('Should pass with valid info', () => {
    const validProfile = {
      email: 'cabrera@gmail.com',
      name: 'Ignacio',
    }
    const validate = users.validatePatch(validProfile)
    expect(validate).toBe(undefined)
  })
})
