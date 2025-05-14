import React from 'react';
import { Router, RouterProvider, Route, RootRoute } from '@tanstack/react-router';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Services } from './pages/Services';
import { Layout } from './components/Layout';

const rootRoute = new RootRoute({
  component: Layout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const blogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: Blog,
});

const blogPostRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/blog-post',
  component: BlogPost,
});

const servicesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/services/$category',
  component: Services,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  blogPostRoute,
  servicesRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;