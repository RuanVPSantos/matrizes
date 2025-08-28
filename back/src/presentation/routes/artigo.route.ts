import { FastifyInstance } from "fastify";
import { createArtigoController, updateArtigoController, deleteArtigoController, listArtigosController, getArtigoController } from "../controllers/artigo.controller";
import { createArtigoSchema, updateArtigoSchema, deleteArtigoSchema, listArtigosSchema, getArtigoSchema } from "../schemas/artigo.schema";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import { zodToFastify } from "../../utils/zod-fastify";


export default async function artigoRoutes(fastify: FastifyInstance) {
  // Public routes
  fastify.get(
    "/subambientes/:subambienteId/artigos",
    {
      schema: {
        ...zodToFastify(listArtigosSchema),
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                title: { type: "string" },
                description: { type: "string", nullable: true },
                subambienteId: { type: "number" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
                blocks: { type: "array", items: { type: "object" } }
              }
            }
          }
        }
      }
    },
    listArtigosController
  );

  fastify.get(
    "/artigos/:id",
    {
      schema: {
        ...zodToFastify(getArtigoSchema),
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              title: { type: "string" },
              description: { type: "string", nullable: true },
              subambienteId: { type: "number" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
              blocks: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    type: { type: "string", enum: ["TEXTO", "IMAGEM", "VIDEO"] },
                    order: { type: "number" },
                    content: { 
                      type: "object",
                      additionalProperties: true
                    },
                    artigoId: { type: "number" },
                    createdAt: { type: "string" },
                    updatedAt: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    },
    getArtigoController
  );

  // Admin routes
  fastify.post(
    "/subambientes/:subambienteId/artigos",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: {
        ...zodToFastify(createArtigoSchema),
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              title: { type: "string" },
              description: { type: "string", nullable: true },
              subambienteId: { type: "number" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" }
            }
          }
        }
      }
    },
    createArtigoController
  );

  fastify.put(
    "/artigos/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: {
        ...zodToFastify(updateArtigoSchema),
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              title: { type: "string" },
              description: { type: "string", nullable: true },
              subambienteId: { type: "number" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" }
            }
          }
        }
      }
    },
    updateArtigoController
  );

  fastify.delete(
    "/artigos/:id",
    {
      preHandler: [authMiddleware, adminMiddleware],
      schema: {
        ...zodToFastify(deleteArtigoSchema),
        response: {
          200: { type: "object", properties: { message: { type: "string" } } }
        }
      }
    },
    deleteArtigoController
  );
}
