import type { FastifyInstance } from "fastify";
import prisma from "../lib/prisma.js";

export async function profileRoutes(server: FastifyInstance) {
  server.get("/api/profile", async () => {
    const profile = await prisma.user.findFirst();

    return profile;
  });
}