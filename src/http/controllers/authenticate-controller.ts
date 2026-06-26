import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';
import { makeAuthenticateService } from '../services/factories/make-authenticate-service';

const authenticateService = makeAuthenticateService();

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const { user } = await authenticateService.execute({ email, password });

    const token = await reply.jwtSign({}, { sign: { sub: user.id } });

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
