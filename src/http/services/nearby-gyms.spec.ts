import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { NearbyGymsService } from './nearby-gyms-service';

let gymsRepository: InMemoryGymsRepository;
let nearbyGymsService: NearbyGymsService;

describe('Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    nearbyGymsService = new NearbyGymsService(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Treinar JS',
      phone: '11999999999',
      latitude: -23.6869165,
      longitude: -46.6222736,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Treinar TS',
      phone: '11999999999',
      latitude: -22.9172911,
      longitude: -47.0979463,
    });

    const { gyms } = await nearbyGymsService.execute({
      userLatitude: -23.6893644,
      userLongitude: -46.6252291,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
