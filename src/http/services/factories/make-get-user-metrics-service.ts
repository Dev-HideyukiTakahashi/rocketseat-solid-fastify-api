import { GetUserMetricsService } from '../get-user-metrics-service';
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins-repository';

export function makeGetUserMetricsService() {
  const checkInRepository = new PrismaCheckInsRepository();
  const getUserMetricsService = new GetUserMetricsService(checkInRepository);

  return getUserMetricsService;
}
