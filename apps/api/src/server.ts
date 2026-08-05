import Fastify from "fastify";
import cors from "@fastify/cors";
import { profileRoutes } from "./routes/profile.js";

const server = Fastify({
  logger: true,
});

await server.register(cors, {
  origin: "http://localhost:5173",
});

await server.register(profileRoutes);

server.get("/api/health", async () => {
  return {
    status: "ok",
    service: "AI Job Copilot API",
    timestamp: new Date(),
  };
});

try {
  await server.listen({
    port: 3000,
    host: "0.0.0.0",
  });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}