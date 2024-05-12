import { Prisma, Pet } from '@prisma/client'
import { PetsRepositories } from '../pets-repositories'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepositories {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID() ?? data.id,
      age: data.age,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      name: data.name,
      ongId: data.ongId,
      type: data.type,
    }

    this.items.push(pet)

    return pet
  }
}
