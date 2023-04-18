import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const visitorRouter = createTRPCRouter({
  visit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        person: z.enum(["all", "oj", "ge", "id"]),
        reason: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const visitor = await ctx.prisma.visitor.upsert({
        where: {
          email: input.email,
        },
        update: {
          name: input.name,
        },
        create: {
          email: input.email,
          name: input.name,
        },
      });

      await ctx.prisma.visit.create({
        data: {
          visitor: {
            connect: {
              email: visitor.email,
            },
          },
          visiting: input.person,
          reason: input.reason,
        },
      });
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.visit.findMany({
      include: {
        visitor: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.visit.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
