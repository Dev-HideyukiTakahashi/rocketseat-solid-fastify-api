import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { AuthenticateService } from './authenticate-service';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let authenticateService: AuthenticateService;

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateService = new AuthenticateService(usersRepository);
  });
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john-doe@test.com',
      passwordHash: await hash('123456', 6),
    });

    const { user } = await authenticateService.execute({
      email: 'john-doe@test.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateService.execute({
        email: 'not-exists-in-memory@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john-doe@test.com',
      passwordHash: await hash('123456', 6),
    });

    await expect(() =>
      authenticateService.execute({
        email: 'john-doe@test.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
