import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '../authenticate-service';

export function makeAuthenticateService() {
  const userRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(userRepository);

  return authenticateService;
}
