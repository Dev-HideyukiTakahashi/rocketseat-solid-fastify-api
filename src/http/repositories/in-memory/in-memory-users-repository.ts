import { Prisma, User } from 'generated/prisma/client';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find(item => item.email === email);

    return user ? user : null;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'a25f4caf-f3c9-45a8-9363-cc2ed0f1f974',
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
