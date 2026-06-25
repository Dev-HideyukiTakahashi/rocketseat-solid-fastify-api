import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsService } from './search-gyms-service';

let gymsRepository: InMemoryGymsRepository;
let searchGymsService: SearchGymsService;

describe('Check-in History Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    searchGymsService = new SearchGymsService(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: 'Treinar JS',
      phone: '11999999999',
      latitude: -23.6869165,
      longitude: -46.6222736,
    });

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: 'Treinar TS',
      phone: '11999999999',
      latitude: -23.6869165,
      longitude: -46.6222736,
    });

    const { gyms } = await searchGymsService.execute({
      query: 'Javascript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })]);
  });

  it('should be able to search for gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: 'Treinar JS',
        phone: '11999999999',
        latitude: -23.6869165,
        longitude: -46.6222736,
      });
    }

    const { gyms } = await searchGymsService.execute({
      query: 'Javascript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ]);
  });
});
