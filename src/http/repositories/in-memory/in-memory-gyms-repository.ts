import { Gym } from 'generated/prisma/client';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find(item => item.id === gymId);

    return gym ? gym : null;
  }
}
