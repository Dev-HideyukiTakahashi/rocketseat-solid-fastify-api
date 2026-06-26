import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms-repository';
import { NearbyGymsService } from '../nearby-gyms-service';

export function makeNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const nearbyGymsService = new NearbyGymsService(gymsRepository);

  return nearbyGymsService;
}
