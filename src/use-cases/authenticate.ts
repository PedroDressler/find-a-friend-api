import { OngsRepositories } from '@/repositories/ongs-repositories'
import { Ong } from '@prisma/client'
import { compare } from 'bcrypt'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  ong: Ong
}

export class AuthenticateUseCase {
  constructor(private ongRepository: OngsRepositories) {}

  async handle({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const ong = await this.ongRepository.findByEmail(email)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatch = await compare(password, ong.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { ong }
  }
}
