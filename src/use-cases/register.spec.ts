import { InMemoryOngRepository } from '@/repositories/in-memory/in-memory-ong-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

describe('Register Use Case', () => {
  let ongRepository: InMemoryOngRepository
  let sut: RegisterUseCase

  beforeEach(async () => {
    ongRepository = new InMemoryOngRepository()
    sut = new RegisterUseCase(ongRepository)
  })

  it('should register a new ong', async () => {
    const { ong } = await sut.handle({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'pedro123',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    expect(ong).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not register a new ong if it already exists', async () => {
    await sut.handle({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'pedro123',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    expect(async () => {
      await sut.handle({
        name: 'Pedro2',
        email: 'pedro@email.com',
        password: 'pedro123',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })
    }).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
