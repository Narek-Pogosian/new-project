import { createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "../auth";

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
});

export const protectedActionClient = actionClient.use(async ({ next }) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Session not found!");
  }

  return next({ ctx: { userId: session.user.id } });
});

export const adminActionClient = actionClient.use(async ({ next }) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Session not found!");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { userId: session.user.id } });
});
