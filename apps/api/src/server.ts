import Fastify from "fastify";
import cors from "@fastify/cors";
import { profileRoutes} from "./routes/profile.js";
import { skillRoutes } from "./routes/skills.js";

const server = Fastify({
  logger: true,
});

await server.register(cors, {
  origin: "http://localhost:5173",
    methods: [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ],
});

await server.register(profileRoutes);
await server.register(skillRoutes);

server.get("/api/health", async () => {
  return {
    status: "ok",
    service: "AI Job Copilot API",
    timestamp: new Date(),
  };
});
console.log("---------------",server.printRoutes());
try {
  await server.listen({
    port: 3000,
    host: "0.0.0.0",
  });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}