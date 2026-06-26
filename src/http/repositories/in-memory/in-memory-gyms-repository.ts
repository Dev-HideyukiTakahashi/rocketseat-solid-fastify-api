import { Gym, Prisma } from 'generated/prisma/client';
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find(item => item.id === gymId);

    return gym ? gym : null;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter(item => item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter(item => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      );

      return distance < 10; // filtra por academias próximas até 10KM
    });
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
