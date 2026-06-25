import { CheckIn } from 'generated/prisma/client';
import { CheckInsRepository } from '../repositories/check-ins-repository';

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkInRepository.create({
      gymId,
      userId,
    });

    return { checkIn };
  }
}
