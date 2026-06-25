import { CheckIn, Prisma } from 'generated/prisma/client';
import { CheckInsRepository } from '../check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: 'e2f88ea9-dd75-4269-afc7-7ee0e5ffd15f',
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
