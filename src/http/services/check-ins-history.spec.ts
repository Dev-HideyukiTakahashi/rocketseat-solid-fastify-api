import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { CheckInsHistoryService } from './check-ins-history-service';

let checkInRepository: InMemoryCheckInsRepository;
let checkInsHistoryService: CheckInsHistoryService;

describe('Check-in History Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    checkInsHistoryService = new CheckInsHistoryService(checkInRepository);
  });

  it('should be able to fetch check-in history', async () => {
    await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    });

    const { checkIns } = await checkInsHistoryService.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ]);
  });

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-01',
      });
    }

    const { checkIns } = await checkInsHistoryService.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ]);
  });
});
