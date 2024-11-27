import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();

export const protectedActionClient = actionClient;
// .use(async ({ next }) => {
//
//  Check session and add userId to ctx
//   return next({ ctx: { userId } });
// });

export const adminActionClient = actionClient;
// .use(async ({ next }) => {
//
//   return next({ ctx: { userId } });
// });
