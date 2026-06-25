import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';

interface GetUserMetricsServiceRequest {
  userId: string;
}

interface GetUserMetricsServiceResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInRepository: InMemoryCheckInsRepository) {}

  async execute({ userId }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
