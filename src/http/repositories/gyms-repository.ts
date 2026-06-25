import { Gym } from 'generated/prisma/client';

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>;
}
