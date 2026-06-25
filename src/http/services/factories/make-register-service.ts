import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository';
import { RegisterService } from '../register-service';

export function makeRegisterService() {
  const userRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(userRepository);

  return registerService;
}
