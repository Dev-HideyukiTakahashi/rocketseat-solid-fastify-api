import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { CheckInService } from './check-in-service';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/index-browser';

let checkInRepository: InMemoryCheckInsRepository;
let gymsInRepository: InMemoryGymsRepository;
let checkInService: CheckInService;

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsInRepository = new InMemoryGymsRepository();
    checkInService = new CheckInService(checkInRepository, gymsInRepository);

    gymsInRepository.gyms.push({
      id: 'ee0d8543-0788-4504-901c-38418b039859',
      title: 'Academia Javascript',
      description: 'Treinar JS',
      phone: '11999999999',
      latitude: Decimal(-23.6869165),
      longitude: Decimal(-46.6222736),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in a user into a gym', async () => {
    const { checkIn } = await checkInService.execute({
      userId: '118b1091-348b-47de-b809-67d4299b92ef',
      gymId: 'ee0d8543-0788-4504-901c-38418b039859',
      userLatitude: -23.6869165,
      userLongitude: -46.6222736,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be not able to check in twice in the same day', async () => {
    // fixa o relógio para que as duas tentativas ocorram no mesmo dia
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInService.execute({
      userId: '118b1091-348b-47de-b809-67d4299b92ef',
      gymId: 'ee0d8543-0788-4504-901c-38418b039859',
      userLatitude: -23.6869165,
      userLongitude: -46.6222736,
    });

    await expect(() =>
      checkInService.execute({
        userId: '118b1091-348b-47de-b809-67d4299b92ef',
        gymId: 'ee0d8543-0788-4504-901c-38418b039859',
        userLatitude: -23.6869165,
        userLongitude: -46.6222736,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in diferent day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInService.execute({
      userId: '118b1091-348b-47de-b809-67d4299b92ef',
      gymId: 'ee0d8543-0788-4504-901c-38418b039859',
      userLatitude: -23.6869165,
      userLongitude: -46.6222736,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await checkInService.execute({
      userId: '118b1091-348b-47de-b809-67d4299b92ef',
      gymId: 'ee0d8543-0788-4504-901c-38418b039859',
      userLatitude: -23.6869165,
      userLongitude: -46.6222736,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    await expect(() =>
      checkInService.execute({
        userId: '118b1091-348b-47de-b809-67d4299b92ef',
        gymId: 'ee0d8543-0788-4504-901c-38418b039859',
        userLatitude: -23.4612784,
        userLongitude: -47.3130819,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
