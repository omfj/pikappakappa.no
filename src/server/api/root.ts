import { createTRPCRouter } from "@/server/api/trpc";
import { visitorRouter } from "@/server/api/routers/visitor";

export const appRouter = createTRPCRouter({
  visitor: visitorRouter,
});

export type AppRouter = typeof appRouter;
