import type { FastifyInstance } from "fastify";
import prisma from "../lib/prisma.js";

export async function skillRoutes(server: FastifyInstance) {

  server.get("/api/skills", async () => {

    const skills = await prisma.skill.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return skills;
  });


  server.post("/api/skills", async (request) => {

    const body = request.body as {
      name: string;
      category?: string;
      userId: number;
    };


    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        category: body.category,
        userId: body.userId,
      },
    });


    return skill;
  });


  server.delete("/api/skills/:id", async (request) => {

    const { id } = request.params as {
      id: string;
    };


    await prisma.skill.delete({
      where: {
        id: Number(id),
      },
    });


    return {
      message: "Skill deleted",
    };
  });

}