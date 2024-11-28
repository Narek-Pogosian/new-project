import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";

export const actionClient = createSafeActionClient({});

export const protectedActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Session not found!");
  }

  return next({ ctx: { userId: session.user.id } });
});

export const adminActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Session not found!");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { userId: session.user.id } });
});
