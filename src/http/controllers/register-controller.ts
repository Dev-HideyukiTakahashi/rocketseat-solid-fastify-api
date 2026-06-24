import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterService } from '../services/register-service';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';

const registerService = new RegisterService(new PrismaUsersRepository());

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    await registerService.create({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
