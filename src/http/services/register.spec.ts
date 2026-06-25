import { describe, expect, it } from 'vitest';
import { RegisterService } from './register-service';
import { compare } from 'bcryptjs';
import { InMemoryUsersrepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';

describe('Register Service', () => {
  it('should be able to register', async () => {
    const registerService = new RegisterService(new InMemoryUsersrepository());

    const { user } = await registerService.create({
      name: 'John Doe',
      email: 'john-doe@test.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const registerService = new RegisterService(new InMemoryUsersrepository());

    const { user } = await registerService.create({
      name: 'John Doe',
      email: 'john-doe@test.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const registerService = new RegisterService(new InMemoryUsersrepository());

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
