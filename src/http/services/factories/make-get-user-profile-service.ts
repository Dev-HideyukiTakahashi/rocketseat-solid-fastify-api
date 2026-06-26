import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository';
import { GetUserProfileService } from '../get-user-profile-service';

export function makeGetUserProfileService() {
  const userRepository = new PrismaUsersRepository();
  const getUserProfileService = new GetUserProfileService(userRepository);

  return getUserProfileService;
}
