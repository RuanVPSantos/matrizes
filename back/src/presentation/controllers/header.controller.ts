import { FastifyRequest, FastifyReply } from "fastify";
import * as headerService from "../../services/header.service";

export async function getHeaderController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const headerData = await headerService.getHeaderData();
    reply.status(200).send(headerData);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
