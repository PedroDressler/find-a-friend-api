import { Prisma, Pet } from '@prisma/client'
import { PetsRepositories } from '../pets-repositories'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepositories {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID() ?? data.id,
      ongId: data.ongId,
      name: data.name,
      age: data.age,
      type: data.type,
      gender: data.gender,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    }

    this.items.push(pet)

    return pet
  }
}
