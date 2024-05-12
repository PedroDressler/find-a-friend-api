import { OngsRepositories } from '@/repositories/ongs-repositories'
import { Ong } from '@prisma/client'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'
import { hash } from 'bcrypt'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone?: string
  description?: string
  latitude: number
  longitude: number
}

interface RegisterUseCaseResponse {
  ong: Ong
}

export class RegisterUseCase {
  constructor(private ongRepository: OngsRepositories) {}

  async handle({
    name,
    email,
    password,
    phone,
    latitude,
    longitude,
    description,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const emailAlreadyUsed = await this.ongRepository.findByEmail(email)

    if (emailAlreadyUsed) {
      throw new ResourceAlreadyExistsError()
    }

    const ong = await this.ongRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
      phone,
      latitude,
      longitude,
      description,
    })

    return { ong }
  }
}
