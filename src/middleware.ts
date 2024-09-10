import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { getAuthSessionId } from "@convex-dev/auth/server";

const isSignInPage = createRouteMatcher(["/signin"]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/worker(.*)"]);

export default convexAuthNextjsMiddleware((request) => {
  console.log("middleware", request);

  if (isSignInPage(request) && isAuthenticatedNextjs()) {
    // find if the user is logged in from the phone number or the oauth
    return nextjsMiddlewareRedirect(request, "/dashboard");
  }
  if (isProtectedRoute(request) && !isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
