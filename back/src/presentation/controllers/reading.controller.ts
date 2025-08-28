import { FastifyRequest, FastifyReply } from "fastify";
import * as readingService from "../../services/reading.service";

export async function markBlocoAsReadController(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user?.id) {
      return reply.status(401).send({ message: 'User not authenticated' });
    }
    const { blocoId } = request.body as any;
    const result = await readingService.markBlocoAsRead(Number(request.user.id), Number(blocoId));
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function listReadBlocosController(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user?.id) {
      return reply.status(401).send({ message: 'User not authenticated' });
    }
    const { artigoId } = request.params as any;
    const readBlocos = await readingService.listReadBlocos(Number(request.user.id), Number(artigoId));
    reply.status(200).send(readBlocos);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
