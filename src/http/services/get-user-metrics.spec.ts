import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsService } from './get-user-metrics-service';

let checkInRepository: InMemoryCheckInsRepository;
let getUserMetricsService: GetUserMetricsService;

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    getUserMetricsService = new GetUserMetricsService(checkInRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    });

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
