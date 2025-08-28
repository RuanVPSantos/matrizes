import { FastifyInstance } from "fastify";
import { getHeaderController } from "../controllers/header.controller";

export default async function headerRoutes(fastify: FastifyInstance) {
  fastify.get("/header", {
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
              subambientes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    description: { type: "string", nullable: true },
                    artigos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          title: { type: "string" },
                          description: { type: "string", nullable: true }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, getHeaderController);
}
