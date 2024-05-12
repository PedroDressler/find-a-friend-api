import { InMemoryOngRepository } from '@/repositories/in-memory/in-memory-ong-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  let ongRepository: InMemoryOngRepository
  let sut: AuthenticateUseCase

  beforeEach(async () => {
    ongRepository = new InMemoryOngRepository()
    sut = new AuthenticateUseCase(ongRepository)
  })

  it('should authenticate the ong', async () => {
    ongRepository.items.push({
      id: 'user-01',
      name: 'Pedro',
      email: 'pedro@email.com',
      password_hash: await hash('123456', 6),
      description: '',
      phone: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      created_at: new Date(),
    })

    const { ong } = await sut.handle({
      email: 'pedro@email.com',
      password: '123456',
    })

    expect(ong).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not authenticate ong by invalid password', async () => {
    ongRepository.items.push({
      id: 'user-01',
      name: 'Pedro',
      email: 'pedro@email.com',
      password_hash: await hash('123456', 6),
      description: '',
      phone: '',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      created_at: new Date(),
    })

    expect(async () => {
      await sut.handle({
        email: 'pedro@email.com',
        password: '1234567',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
