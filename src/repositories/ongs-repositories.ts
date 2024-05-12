import { Prisma, Ong } from '@prisma/client'

export interface OngsRepositories {
  create(data: Prisma.OngCreateInput): Promise<Ong>

  findByEmail(email: string): Promise<Ong | null>
  findById(id: string): Promise<Ong | null>
}
