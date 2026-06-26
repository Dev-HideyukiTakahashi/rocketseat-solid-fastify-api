import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInsService } from './validate-check-in-service';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error';

let checkInRepository: InMemoryCheckInsRepository;
let validateCheckIn: ValidateCheckInsService;

describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    validateCheckIn = new ValidateCheckInsService(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      userId: '118b1091-348b-47de-b809-67d4299b92ef',
      gymId: '59379f4b-7f4e-4cca-9f77-5f556f8eb3a7',
    });

    const { checkIn } = await validateCheckIn.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validatedAt).toEqual(expect.any(Date));
    expect(checkInRepository.checkIns[0].validatedAt).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      validateCheckIn.execute({
        checkInId: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInRepository.create({
      userId: '118b1091-348b-47de-b809-67d4299b92ef',
      gymId: '59379f4b-7f4e-4cca-9f77-5f556f8eb3a7',
    });

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21;

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS);

    await expect(() =>
      validateCheckIn.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
