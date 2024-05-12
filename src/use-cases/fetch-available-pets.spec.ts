import { InMemoryOngRepository } from '@/repositories/in-memory/in-memory-ong-repository'
import {
  vi,
  it,
  describe,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
} from 'vitest'
import { FetchAvailablePetsUseCase } from './fetch-available-pets'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pets-repositories'
import { hash } from 'bcrypt'
import { Prisma } from '@prisma/client'

describe('Fetch Available Pets Use Case', () => {
  let petRepository: InMemoryPetRepository
  let ongRepository: InMemoryOngRepository
  let sut: FetchAvailablePetsUseCase

  beforeAll(async () => {
    vi.useFakeTimers()
  })

  afterAll(async () => {
    vi.useRealTimers()
  })

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    ongRepository = new InMemoryOngRepository()
    sut = new FetchAvailablePetsUseCase(petRepository)
  })

  it('should fetch list of pets available for adoption', async () => {
    vi.setSystemTime(new Date(2022, 1, 1, 12, 0, 0))

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

    await petRepository.create({
      name: 'Raluca',
      age: 0,
      ongId: 'user-01',
      type: 'CAT',
      gender: 'FEMALE',
    })

    await petRepository.create({
      name: 'Johnny',
      age: 7,
      ongId: 'user-01',
      type: 'CAT',
      gender: 'MALE',
      adopted_at: new Date(2016, 1, 1, 12, 0, 0),
    })

    await petRepository.create({
      name: 'Nina',
      age: 7,
      ongId: 'user-01',
      type: 'CAT',
      gender: 'FEMALE',
      adopted_at: new Date(2016, 1, 1, 12, 0, 0),
    })

    const { pets } = await sut.handle({
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Johnny',
      }),
      expect.objectContaining({
        name: 'Nina',
      }),
    ])
  })

  it('should fetch list of pets available for adoption above page 1', async () => {
    vi.setSystemTime(new Date(2022, 1, 1, 12, 0, 0))

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

    await petRepository.create({
      name: 'Raluca',
      age: 0,
      ongId: 'user-01',
      type: 'CAT',
      gender: 'FEMALE',
    })

    for (let i = 1; i <= 22; i++) {
      await petRepository.create({
        id: `cat-${i}`,
        name: 'Johnny',
        age: 7,
        ongId: 'user-01',
        type: 'CAT',
        gender: 'MALE',
        adopted_at: new Date(2016, 1, 1, 12, 0, 0),
      })
    }

    const { pets } = await sut.handle({
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        id: 'cat-21',
      }),
      expect.objectContaining({
        id: 'cat-22',
      }),
    ])
  })
})
