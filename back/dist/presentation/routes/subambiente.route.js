"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = subambienteRoutes;
const subambiente_controller_1 = require("../controllers/subambiente.controller");
const subambiente_schema_1 = require("../schemas/subambiente.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function subambienteRoutes(fastify) {
    // Public routes
    fastify.get("/ambientes/:ambienteId/subambientes", {
        schema: (0, zod_fastify_1.zodToFastify)(subambiente_schema_1.listSubambientesSchema)
    }, subambiente_controller_1.listSubambientesController);
    // Admin routes
    fastify.post("/ambientes/:ambienteId/subambientes", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(subambiente_schema_1.createSubambienteSchema)
    }, subambiente_controller_1.createSubambienteController);
    fastify.put("/subambientes/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(subambiente_schema_1.updateSubambienteSchema)
    }, subambiente_controller_1.updateSubambienteController);
    fastify.delete("/subambientes/:id", {
        preHandler: [auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware],
        schema: (0, zod_fastify_1.zodToFastify)(subambiente_schema_1.deleteSubambienteSchema)
    }, subambiente_controller_1.deleteSubambienteController);
    fastify.get("/subambientes/:id", {
        schema: (0, zod_fastify_1.zodToFastify)(subambiente_schema_1.listSubambientesByIdSchema)
    }, subambiente_controller_1.listSubambientesByIdController);
}
//# sourceMappingURL=subambiente.route.js.map