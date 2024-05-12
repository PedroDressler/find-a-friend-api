import { Pet, Prisma } from '@prisma/client'

export interface PetsRepositories {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
