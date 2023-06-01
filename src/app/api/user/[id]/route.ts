import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { userSchema } from "@/lib/validators/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function POST(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { id } = context.params;
    const payload = await userSchema.parseAsync(await request.json());
    const session = await getSession();

    if (session?.id !== id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.id },
      data: {
        name: payload.name,
        biography: payload.bio,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
