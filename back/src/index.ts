import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "dotenv";

// Import routes
import authRoutes from "./presentation/routes/auth.route";
import userRoutes from "./presentation/routes/user.route";
import ambienteRoutes from "./presentation/routes/ambiente.route";
import subambienteRoutes from "./presentation/routes/subambiente.route";
import artigoRoutes from "./presentation/routes/artigo.route";
import blocoRoutes from "./presentation/routes/bloco.route";
import favoriteRoutes from "./presentation/routes/favorite.route";
import readingRoutes from "./presentation/routes/reading.route";
import headerRoutes from "./presentation/routes/header.route";

config();

const fastify = Fastify({
  logger: true
});

// Register CORS
fastify.register(cors, {
  origin: true,
  credentials: true
});

// Register routes
fastify.register(authRoutes);
fastify.register(userRoutes);
fastify.register(ambienteRoutes);
fastify.register(subambienteRoutes);
fastify.register(artigoRoutes);
fastify.register(blocoRoutes);
fastify.register(favoriteRoutes);
fastify.register(readingRoutes);
fastify.register(headerRoutes);

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
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
