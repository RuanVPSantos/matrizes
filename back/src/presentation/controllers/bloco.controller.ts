import { FastifyRequest, FastifyReply } from "fastify";
import * as blocoService from "../../services/bloco.service";

export async function createBlocoController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { artigoId } = request.params as any;
    const createData = request.body as any;
    const bloco = await blocoService.createBloco(artigoId, createData);
    reply.status(201).send(bloco);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function updateBlocoController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const updateData = request.body as any;
    const bloco = await blocoService.updateBloco(id, updateData);
    reply.status(200).send(bloco);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function deleteBlocoController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const result = await blocoService.deleteBloco(id);
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function reorderBlocosController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { artigoId } = request.params as any;
    const { orderList } = request.body as any;
    const result = await blocoService.reorderBlocos(artigoId, orderList);
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
