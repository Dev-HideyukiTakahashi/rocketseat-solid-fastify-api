import { Gym, Prisma } from 'generated/prisma/client';

export interface FindManyNearbyParams {
  latutide: number;
  longitude: number;
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
