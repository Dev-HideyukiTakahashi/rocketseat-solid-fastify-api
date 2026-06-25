import { CheckIn } from 'generated/prisma/client';
import { CheckInsRepository } from '../repositories/check-ins-repository';
import { GymsRepository } from '../repositories/gyms-repository';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const MAX_DISTANCE_IN_KM = 0.1;

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    // calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
    );

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new Error();
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInRepository.create({
      gymId,
      userId,
    });

    return { checkIn };
  }
}
