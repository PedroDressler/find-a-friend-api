import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pets-repositories'
import { FilterPetsByDetailsUseCase } from './filter-pets-by-details'
import { InMemoryOngRepository } from '@/repositories/in-memory/in-memory-ong-repository'
import { hash } from 'bcrypt'

describe('Fetch Available Pets Use Case', () => {
  let petRepository: InMemoryPetRepository
  let ongRepository: InMemoryOngRepository
  let sut: FilterPetsByDetailsUseCase

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    ongRepository = new InMemoryOngRepository()
    sut = new FilterPetsByDetailsUseCase(petRepository)

    const { id } = await ongRepository.create({
      id: 'ong-01',
      name: 'Pedro',
      email: 'pedro@email.com',
      password_hash: await hash('123456', 6),
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    await petRepository.create({
      name: 'Raluca',
      age: 0,
      ongId: id,
      type: 'CAT',
      gender: 'FEMALE',
    })

    await petRepository.create({
      name: 'Rex',
      age: 12,
      ongId: id,
      type: 'DOG',
      gender: 'MALE',
    })

    await petRepository.create({
      name: 'Tiger',
      age: 2,
      ongId: id,
      type: 'CAT',
      gender: 'MALE',
    })
  })

  it('should fetch a list of pets filtered by details', async () => {
    const firstReq = await sut.handle({
      page: 1,
      details: {
        age: 12,
      },
    })

    expect(firstReq.pets).toHaveLength(1)
    expect(firstReq.pets).toEqual([
      expect.objectContaining({
        name: 'Rex',
      }),
    ])

    const secondReq = await sut.handle({
      page: 1,
      details: {
        type: 'CAT',
      },
    })

    expect(secondReq.pets).toHaveLength(2)
    expect(secondReq.pets).toEqual([
      expect.objectContaining({
        name: 'Raluca',
      }),
      expect.objectContaining({
        name: 'Tiger',
      }),
    ])
  })

  it('should not fetch a list of pets if details does not match', async () => {
    const response = await sut.handle({
      page: 1,
      details: {
        type: 'DOG',
        age: 5,
      },
    })

    expect(response.pets).toHaveLength(0)
  })
})
