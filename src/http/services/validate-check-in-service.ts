import { CheckIn } from 'generated/prisma/client';
import { CheckInsRepository } from '../repositories/check-ins-repository';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

interface ValidateCheckInRequest {
  checkInId: string;
}

interface ValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckIn {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    checkIn.validatedAt = new Date();

    await this.checkInRepository.save(checkIn);

    return { checkIn };
  }
}
