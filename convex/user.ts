import { log } from "console";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getCurrUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});

export const userType = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const u = await ctx.db
      .query("authAccounts")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (u === null) {
      return null;
    }
    return u.provider;
  },
});
