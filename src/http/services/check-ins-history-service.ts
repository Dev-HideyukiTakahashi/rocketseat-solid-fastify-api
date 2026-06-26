import { CheckIn } from 'generated/prisma/client';
import { CheckInsRepository } from '../repositories/check-ins-repository';

interface CheckInsHistoryServiceRequest {
  userId: string;
  page: number;
}

interface CheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class CheckInsHistoryService {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: CheckInsHistoryServiceRequest): Promise<CheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
