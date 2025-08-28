import { FastifyInstance } from "fastify";
import { markBlocoAsReadController, listReadBlocosController } from "../controllers/reading.controller";
import { markBlocoAsReadSchema, listReadBlocosSchema } from "../schemas/reading.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default async function readingRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/readings",
    {
      preHandler: authMiddleware,
      schema: zodToFastify(markBlocoAsReadSchema)
    },
    markBlocoAsReadController
  );

  fastify.get(
    "/artigos/:artigoId/readings",
    {
      preHandler: authMiddleware,
      schema: zodToFastify(listReadBlocosSchema)
    },
    listReadBlocosController
  );
}
