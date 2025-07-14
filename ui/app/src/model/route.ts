

// Base prefix for all routes
export const BASE_PREFIX = '/observe';

// Route definitions with prefix
export const AdminRoute = '/admin';
export const SignInRoute = '/sign-in';
export const SignUpRoute = '/sign-up';
export const ConfigRoute = '/config';
export const ImportRoute = '/import';
export const ProjectRoute = '/projects';
export const ExploreRoute = '/explore';
export const ProfileRoute = '/profile';

export function getBasePathName(): string {
  const path = window.location.pathname;

  if (path.startsWith(BASE_PREFIX)) {
    return BASE_PREFIX;
  }

  return '/';
}
