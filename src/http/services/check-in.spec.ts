import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInsRepository } from '../repositories/check-ins-repository';
import { CheckInService } from './check-in-service';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';

let checkInRepository: CheckInsRepository;
let checkInService: CheckInService;

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    checkInService = new CheckInService(checkInRepository);
  });

  it('should be able to check in a user into a gym', async () => {
    const { checkIn } = await checkInService.execute({
      userId: '118b1091-348b-47de-b809-67d4299b92ef',
      gymId: 'ee0d8543-0788-4504-901c-38418b039859',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
