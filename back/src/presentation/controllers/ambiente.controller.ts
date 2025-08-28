import { FastifyRequest, FastifyReply } from "fastify";
import * as ambienteService from "../../services/ambiente.service";

export async function createAmbienteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createData = request.body as any;
    const ambiente = await ambienteService.createAmbiente(createData);
    reply.status(201).send(ambiente);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function updateAmbienteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const updateData = request.body as any;
    const ambiente = await ambienteService.updateAmbiente(id, updateData);
    reply.status(200).send(ambiente);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function deleteAmbienteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const result = await ambienteService.deleteAmbiente(id);
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function listAmbientesController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const ambientes = await ambienteService.listAmbientes();
    reply.status(200).send(ambientes);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
