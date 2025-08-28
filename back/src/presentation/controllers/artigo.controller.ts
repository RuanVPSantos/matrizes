import { FastifyRequest, FastifyReply } from "fastify";
import * as artigoService from "../../services/artigo.service";

export async function createArtigoController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { subambienteId } = request.params as any;
    const createData = request.body as any;
    const artigo = await artigoService.createArtigo(subambienteId, createData);
    reply.status(201).send(artigo);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function updateArtigoController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const updateData = request.body as any;
    const artigo = await artigoService.updateArtigo(id, updateData);
    reply.status(200).send(artigo);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function deleteArtigoController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const result = await artigoService.deleteArtigo(id);
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function listArtigosController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { subambienteId } = request.params as any;
    const artigos = await artigoService.listArtigos(subambienteId);
    reply.status(200).send(artigos);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function getArtigoController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const artigo = await artigoService.getArtigo(id);
    reply.status(200).send(artigo);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
