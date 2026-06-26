import { CheckInsHistoryService } from '../check-ins-history-service';
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins-repository';

export function makeCheckInsHistoryService() {
  const checkInRepository = new PrismaCheckInsRepository();
  const checkInsHistoryService = new CheckInsHistoryService(checkInRepository);

  return checkInsHistoryService;
}
