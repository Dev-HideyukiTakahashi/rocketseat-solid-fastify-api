import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms-repository';
import { CheckInService } from '../check-in-service';
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins-repository';

export function makeCheckInService() {
  const checkInRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const checkInService = new CheckInService(checkInRepository, gymsRepository);

  return checkInService;
}
