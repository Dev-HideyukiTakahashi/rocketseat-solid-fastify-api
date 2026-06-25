import { Gym, Prisma } from 'generated/prisma/client';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find(item => item.id === gymId);

    return gym ? gym : null;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: 'ee0d8543-0788-4504-901c-38418b039859',
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }
}
