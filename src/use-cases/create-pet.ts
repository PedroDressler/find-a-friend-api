import { Pet, PetGender, PetType } from '@prisma/client'
import { PetsRepositories } from '@/repositories/pets-repositories'
import { randomUUID } from 'crypto'
import { OngsRepositories } from '@/repositories/ongs-repositories'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  ongId: string
  age: number
  type: PetType
  gender: PetGender
  adopted_at?: Date
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepositories,
    private ongsRepository: OngsRepositories,
  ) {}

  async handle({
    name,
    ongId,
    age,
    type,
    gender,
    adopted_at,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const ong = await this.ongsRepository.findById(ongId)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      id: randomUUID(),
      ongId,
      name,
      age,
      type,
      gender,
      adopted_at,
    })

    return { pet }
  }
}
