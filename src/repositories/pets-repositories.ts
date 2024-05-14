import { $Enums, Pet, Prisma } from '@prisma/client'

export interface PetDetails {
  gender?: $Enums.PetGender
  age?: number
  type?: $Enums.PetType
}

export interface PetsRepositories {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findManyByAvailableAdoption(page: number): Promise<Pet[]>
  findManyByDetails(page: number, deatils: PetDetails): Promise<Pet[]>
}
