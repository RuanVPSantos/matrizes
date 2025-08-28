"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = favoriteRoutes;
const favorite_controller_1 = require("../controllers/favorite.controller");
const favorite_schema_1 = require("../schemas/favorite.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_fastify_1 = require("../../utils/zod-fastify");
async function favoriteRoutes(fastify) {
    fastify.post("/favorites", {
        preHandler: auth_middleware_1.authMiddleware,
        schema: (0, zod_fastify_1.zodToFastify)(favorite_schema_1.addFavoriteSchema)
    }, favorite_controller_1.addFavoriteController);
    fastify.delete("/favorites", {
        preHandler: auth_middleware_1.authMiddleware,
        schema: (0, zod_fastify_1.zodToFastify)(favorite_schema_1.removeFavoriteSchema)
    }, favorite_controller_1.removeFavoriteController);
    fastify.get("/favorites", {
        preHandler: auth_middleware_1.authMiddleware,
        schema: (0, zod_fastify_1.zodToFastify)(favorite_schema_1.listFavoritesSchema)
    }, favorite_controller_1.listFavoritesController);
}
//# sourceMappingURL=favorite.route.js.map