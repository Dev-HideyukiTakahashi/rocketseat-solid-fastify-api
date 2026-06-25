import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterService } from './register-service';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';

let userRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe('Register Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    registerService = new RegisterService(userRepository);
  });

  it('should be able to register', async () => {
    const { user } = await registerService.create({
      name: 'John Doe',
      email: 'john-doe@test.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await registerService.create({
      name: 'John Doe',
      email: 'john-doe@test.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'john-doe@test.com';

    await registerService.create({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(() =>
      registerService.create({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
