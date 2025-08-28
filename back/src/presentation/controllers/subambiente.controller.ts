import { FastifyRequest, FastifyReply } from "fastify";
import * as subambienteService from "../../services/subambiente.service";

export async function createSubambienteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { ambienteId } = request.params as any;
    const createData = request.body as any;
    const subambiente = await subambienteService.createSubambiente(ambienteId, createData);
    reply.status(201).send(subambiente);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function updateSubambienteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const updateData = request.body as any;
    const subambiente = await subambienteService.updateSubambiente(id, updateData);
    reply.status(200).send(subambiente);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function deleteSubambienteController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const result = await subambienteService.deleteSubambiente(id);
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function listSubambientesController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { ambienteId } = request.params as any;
    const subambientes = await subambienteService.listSubambientes(ambienteId);
    reply.status(200).send(subambientes);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
