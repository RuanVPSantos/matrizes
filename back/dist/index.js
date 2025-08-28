"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = require("dotenv");
// Import routes
const auth_route_1 = __importDefault(require("./presentation/routes/auth.route"));
const user_route_1 = __importDefault(require("./presentation/routes/user.route"));
const ambiente_route_1 = __importDefault(require("./presentation/routes/ambiente.route"));
const subambiente_route_1 = __importDefault(require("./presentation/routes/subambiente.route"));
const artigo_route_1 = __importDefault(require("./presentation/routes/artigo.route"));
const bloco_route_1 = __importDefault(require("./presentation/routes/bloco.route"));
const favorite_route_1 = __importDefault(require("./presentation/routes/favorite.route"));
const reading_route_1 = __importDefault(require("./presentation/routes/reading.route"));
const header_route_1 = __importDefault(require("./presentation/routes/header.route"));
(0, dotenv_1.config)();
const fastify = (0, fastify_1.default)({
    logger: true
});
// Register CORS
fastify.register(cors_1.default, {
    origin: true,
    credentials: true
});
// Register routes
fastify.register(auth_route_1.default);
fastify.register(user_route_1.default);
fastify.register(ambiente_route_1.default);
fastify.register(subambiente_route_1.default);
fastify.register(artigo_route_1.default);
fastify.register(bloco_route_1.default);
fastify.register(favorite_route_1.default);
fastify.register(reading_route_1.default);
fastify.register(header_route_1.default);
// Health check route
fastify.get("/health", async (request, reply) => {
    return { status: "OK", timestamp: new Date().toISOString() };
});
// Start server
const start = async () => {
    try {
        const port = parseInt(process.env.PORT || "3000");
        await fastify.listen({ port, host: "0.0.0.0" });
        console.log(`Server is running on port ${port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map