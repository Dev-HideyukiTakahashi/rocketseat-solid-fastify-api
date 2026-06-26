import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins-repository';
import { ValidateCheckInsService } from '../validate-check-in-service';

export function makeValidateCheckInService() {
  const checkInRepository = new PrismaCheckInsRepository();
  const validateCheckInService = new ValidateCheckInsService(checkInRepository);

  return validateCheckInService;
}
