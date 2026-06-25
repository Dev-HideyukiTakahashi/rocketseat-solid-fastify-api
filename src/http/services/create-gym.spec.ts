import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { CreateGymService } from './create-gym-service';

let gymsRepository: InMemoryGymsRepository;
let createGymService: CreateGymService;

describe('Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymService = new CreateGymService(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await createGymService.create({
      title: 'Academia Javascript',
      description: 'Treinar JS',
      phone: '11999999999',
      latitude: -23.6869165,
      longitude: -46.6222736,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
