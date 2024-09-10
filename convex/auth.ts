import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import { TwilioVerify } from "./otp/TwilioVerify";
import { TwilioOTP } from "./otp/TwilioOTP";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub, TwilioVerify, TwilioOTP],
  callbacks: {},
});
