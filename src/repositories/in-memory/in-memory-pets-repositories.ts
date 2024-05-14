import { Prisma, Pet } from '@prisma/client'
import { PetDetails, PetsRepositories } from '../pets-repositories'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetsRepositories {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
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

  async findManyByAvailableAdoption(page: number) {
    const pets = this.items
      .filter((item) => item.adopted_at !== null)
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async findManyByDetails(page: number, { age, gender, type }: PetDetails) {
    const pets = this.items
      .filter((item) => (item.age ? item.age === age : null))
      .filter((item) => (item.gender ? item.gender === gender : null))
      .filter((item) => (item.type ? item.type === type : null))
      .slice((page - 1) * 20, page * 20)

    // .filter((item) => {
    //   return item.age === age || item.gender === gender || item.type === type
    // })

    return pets
  }
}
