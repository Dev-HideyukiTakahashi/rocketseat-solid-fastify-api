import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '../services/authenticate-service';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

const authenticateService = new AuthenticateService(new PrismaUsersRepository());

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    await authenticateService.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}
