import { Pet } from '@prisma/client'
import { PetDetails, PetsRepositories } from '@/repositories/pets-repositories'

interface FilterPetsByDetailsUseCaseRequest {
  page: number
  details: PetDetails
}

interface FilterPetsByDetailsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsByDetailsUseCase {
  constructor(private petsRepository: PetsRepositories) {}

  async handle({
    page,
    details,
  }: FilterPetsByDetailsUseCaseRequest): Promise<FilterPetsByDetailsUseCaseResponse> {
    const { age, gender, type } = details

    const pets = await this.petsRepository.findManyByDetails(page, {
      age,
      gender,
      type,
    })

    return { pets }
  }
}
