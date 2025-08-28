import { FastifyInstance } from "fastify";
import { createAmbienteController, updateAmbienteController, deleteAmbienteController, listAmbientesController } from "../controllers/ambiente.controller";
import { createAmbienteSchema, updateAmbienteSchema, deleteAmbienteSchema } from "../schemas/ambiente.schema";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";

export default async function ambienteRoutes(fastify: FastifyInstance) {
  // Public routes
  fastify.get("/ambientes", {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              description: { type: "string", nullable: true },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
              subambientes: { type: "array", items: { type: "object" } }
            }
          }
        }
      }
    }
  }, listAmbientesController);

  // Admin routes
  fastify.post(
    "/ambientes",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: {
        ...zodToFastify(createAmbienteSchema),
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              description: { type: "string", nullable: true },
              createdAt: { type: "string" },
              updatedAt: { type: "string" }
            }
          },
          400: { type: "object", properties: { message: { type: "string" } } }
        }
      }
    },
    createAmbienteController
  );

  fastify.put(
    "/ambientes/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: {
        ...zodToFastify(updateAmbienteSchema),
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              description: { type: "string", nullable: true },
              createdAt: { type: "string" },
              updatedAt: { type: "string" }
            }
          },
          400: { type: "object", properties: { message: { type: "string" } } }
        }
      }
    },
    updateAmbienteController
  );

  fastify.delete(
    "/ambientes/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: {
        ...zodToFastify(deleteAmbienteSchema),
        response: {
          200: { type: "object", properties: { message: { type: "string" } } },
          400: { type: "object", properties: { message: { type: "string" } } }
        }
      }
    },
    deleteAmbienteController
  );
}
