import { Pet } from '@prisma/client'
import { PetsRepositories } from '@/repositories/pets-repositories'

interface FetchAvailablePetsUseCaseRequest {
  page: number
}

interface FetchAvailablePetsUseCaseResponse {
  pets: Pet[]
}

export class FetchAvailablePetsUseCase {
  constructor(private petsRepository: PetsRepositories) {}

  async handle({
    page,
  }: FetchAvailablePetsUseCaseRequest): Promise<FetchAvailablePetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByAvailableAdoption(page)

    return { pets }
  }
}
