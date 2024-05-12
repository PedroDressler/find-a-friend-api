import { Ong, Prisma } from '@prisma/client'
import { OngsRepositories } from '../ongs-repositories'
import { randomUUID } from 'crypto'

export class InMemoryOngRepository implements OngsRepositories {
  public items: Ong[] = []

  async create(data: Prisma.OngCreateInput) {
    const ong: Ong = {
      id: randomUUID() ?? data.id,
      name: data.name,
      email: data.email,
      description: data.description ?? null,
      phone: data.phone ?? null,
      created_at: new Date(),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(ong)

    return ong
  }
}
