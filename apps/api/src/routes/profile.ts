import type { FastifyInstance } from "fastify";
import prisma from "../lib/prisma.js";
import { ProfileSchema } from "../schemas/profile.js";

export async function profileRoutes(server: FastifyInstance) {

    console.log("PROFILE ROUTES REGISTERED");
    
  server.get("/api/profile", async () => {
    const profile = await prisma.user.findFirst();

    return profile;
  });

  server.put("/api/profile", async (request, reply) => {
  const body = ProfileSchema.parse(request.body);

    const profile = await prisma.user.upsert({
      where: {
        email: body.email,
      },
      update: {
        name: body.name,
        professionalSummary: body.professionalSummary,
      },
      create: {
        name: body.name,
        email: body.email,
        professionalSummary: body.professionalSummary,
      },
    });

    return reply.code(200).send(profile);
  });
}