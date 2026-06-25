import { CheckIn } from 'generated/prisma/client';
import { CheckInsRepository } from '../repositories/check-ins-repository';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error';

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes',
    );

    if (distanceInMinutesFromCheckInCreation > 20) throw new LateCheckInValidationError();

    await this.checkInRepository.save(checkIn);

    return { checkIn };
  }
}
