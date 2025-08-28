"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ambienteRoutes;
const ambiente_controller_1 = require("../controllers/ambiente.controller");
const ambiente_schema_1 = require("../schemas/ambiente.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function ambienteRoutes(fastify) {
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
    }, ambiente_controller_1.listAmbientesController);
    // Admin routes
    fastify.post("/ambientes", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(ambiente_schema_1.createAmbienteSchema),
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
    }, ambiente_controller_1.createAmbienteController);
    fastify.put("/ambientes/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(ambiente_schema_1.updateAmbienteSchema),
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
    }, ambiente_controller_1.updateAmbienteController);
    fastify.delete("/ambientes/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(ambiente_schema_1.deleteAmbienteSchema),
            response: {
                200: { type: "object", properties: { message: { type: "string" } } },
                400: { type: "object", properties: { message: { type: "string" } } }
            }
        }
    }, ambiente_controller_1.deleteAmbienteController);
    fastify.get("/ambientes/:id", {
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(ambiente_schema_1.getAmbienteSchema),
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
                }
            }
        }
    }, ambiente_controller_1.listAmbientesByIdController);
}
//# sourceMappingURL=ambiente.route.js.map