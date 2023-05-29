import { prisma } from "@/lib/db/client";
import { visitSchema } from "@/lib/validators/visit";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  /**
   * TODO: Rate limit
   */
  try {
    const payload = await visitSchema.parseAsync(await request.json());

    const visit = await prisma.visit.create({
      data: {
        email: payload.email,
        name: payload.name,
        reason: payload.reason,
        visiting: {
          create: payload.visiting.map((v) => ({
            member: {
              connect: {
                id: v,
              },
            },
          })),
        },
      },
    });

    return new Response(JSON.stringify(visit), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
