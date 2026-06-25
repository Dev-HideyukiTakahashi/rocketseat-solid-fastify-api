import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckIn } from './validate-check-in-service';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

let checkInRepository: InMemoryCheckInsRepository;
let validateCheckIn: ValidateCheckIn;

describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    validateCheckIn = new ValidateCheckIn(checkInRepository);

    // vi.useFakeTimers();
  });

  // afterEach(() => {
  //   vi.useRealTimers();
  // });

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
});
