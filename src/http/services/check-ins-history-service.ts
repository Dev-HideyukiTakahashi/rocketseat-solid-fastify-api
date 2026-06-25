import { CheckIn } from 'generated/prisma/client';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';

interface CheckInsHistoryServiceRequest {
  userId: string;
  page: number;
}

interface CheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class CheckInsHistoryService {
  constructor(private checkInRepository: InMemoryCheckInsRepository) {}

  async execute({
    userId,
    page,
  }: CheckInsHistoryServiceRequest): Promise<CheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
