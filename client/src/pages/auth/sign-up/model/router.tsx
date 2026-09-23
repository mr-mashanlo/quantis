import { type RouteObject } from 'react-router';

export const signUpRouter: RouteObject = {
  path: '/signup',
  lazy: {
    Component: async () => { return ( await import( '../ui/page' ) ).SignUpPage; }
  },
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};