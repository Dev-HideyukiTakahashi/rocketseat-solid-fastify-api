import type { Gym } from 'generated/prisma/client';
import { GymsRepository } from '../repositories/gyms-repository';

interface NearbyGymsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

interface NearbyGymsServiceResponse {
  gyms: Gym[];
}

export class NearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: NearbyGymsServiceRequest): Promise<NearbyGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latutide: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
