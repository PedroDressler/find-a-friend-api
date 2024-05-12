import { it, describe, expect, beforeEach } from 'vitest'
import { PetsRepositories } from '@/repositories/pets-repositories'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pets-repositories'
import { CreatePetUseCase } from './create-pet'
import { OngsRepositories } from '@/repositories/ongs-repositories'
import { InMemoryOngRepository } from '@/repositories/in-memory/in-memory-ong-repository'
import { hash } from 'bcrypt'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Create Pet Use Case', () => {
  let petRepository: PetsRepositories
  let ongRepository: OngsRepositories
  let sut: CreatePetUseCase

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    ongRepository = new InMemoryOngRepository()
    sut = new CreatePetUseCase(petRepository, ongRepository)
  })

  it('should create a new pet', async () => {
    const ong = await ongRepository.create({
      id: 'ong-01',
      name: 'Pedro',
      email: 'pedro@email.com',
      password_hash: await hash('123456', 6),
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    const { pet } = await sut.handle({
      name: 'Raluca',
      age: 0,
      ongId: ong.id,
      type: 'CAT',
      gender: 'FEMALE',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ongId: 'ong-01',
      }),
    )
  })

  it('should not create a new pet if ong does not exists', async () => {
    await ongRepository.create({
      name: 'Pedro',
      email: 'pedro@email.com',
      password_hash: await hash('123456', 6),
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    expect(async () => {
      await sut.handle({
        name: 'Raluca',
        age: 0,
        ongId: 'inexistent-ong',
        type: 'CAT',
        gender: 'FEMALE',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
