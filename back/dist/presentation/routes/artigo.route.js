"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = artigoRoutes;
const artigo_controller_1 = require("../controllers/artigo.controller");
const artigo_schema_1 = require("../schemas/artigo.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function artigoRoutes(fastify) {
    // Public routes
    fastify.get("/subambientes/:subambienteId/artigos", {
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(artigo_schema_1.listArtigosSchema),
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
    }, artigo_controller_1.listArtigosController);
    fastify.get("/artigos/:id", {
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(artigo_schema_1.getArtigoSchema),
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
    }, artigo_controller_1.getArtigoController);
    // Admin routes
    fastify.post("/subambientes/:subambienteId/artigos", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(artigo_schema_1.createArtigoSchema),
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
    }, artigo_controller_1.createArtigoController);
    fastify.put("/artigos/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(artigo_schema_1.updateArtigoSchema),
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
    }, artigo_controller_1.updateArtigoController);
    fastify.delete("/artigos/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: {
            ...(0, zod_fastify_1.zodToFastify)(artigo_schema_1.deleteArtigoSchema),
            response: {
                200: { type: "object", properties: { message: { type: "string" } } }
            }
        }
    }, artigo_controller_1.deleteArtigoController);
}
//# sourceMappingURL=artigo.route.js.map