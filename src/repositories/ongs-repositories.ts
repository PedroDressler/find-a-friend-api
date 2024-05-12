import { Prisma, Ong } from '@prisma/client'

export interface OngsRepositories {
  create(data: Prisma.OngCreateInput): Promise<Ong>
}
