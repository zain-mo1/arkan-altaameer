import type { ComponentType } from 'react';
import { createBrowserRouter, createMemoryRouter, type RouteObject } from 'react-router';
import { PAGE_KEYS, pages, type PageKey } from '@/config/pages';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { SiteLayout } from './SiteLayout';

type PageModule = Promise<{ default: ComponentType }>;

/** Inner pages are code-split: each one (with its copy in both languages) loads on first visit. */
const loaders: Record<Exclude<PageKey, 'home'>, () => PageModule> = {
  about: () => import('@/pages/about'),
  services: () => import('@/pages/services'),
  projects: () => import('@/pages/projects'),
  faq: () => import('@/pages/faq'),
  quote: () => import('@/pages/quote'),
  contact: () => import('@/pages/contact'),
  privacy: () => import('@/pages/legal/Privacy'),
  terms: () => import('@/pages/legal/Terms'),
};

/** Arabic lives at the root ("/"), English under "/en/" — both share the same page tree. */
const children = (): RouteObject[] => [
  { index: true, Component: Home },
  ...PAGE_KEYS.filter((k) => k !== 'home').map((key): RouteObject => ({
    path: pages[key].path.slice(1),
    lazy: { Component: async () => (await loaders[key as Exclude<PageKey, 'home'>]()).default },
  })),
  { path: '*', Component: NotFound },
];

const routes: RouteObject[] = [
  { path: '/', element: <SiteLayout lang="ar" />, children: children(), hydrateFallbackElement: <></> },
  { path: '/en', element: <SiteLayout lang="en" />, children: children(), hydrateFallbackElement: <></> },
];

/**
 * Static previews (`npm run build:artifact`) are served from a URL path we don't control, so they route
 * in memory. The preview link's hash picks the first page: `#en` → English home, `#about` → Arabic
 * About page, `#en-projects` → English Projects page.
 */
function previewEntry() {
  const hash = window.location.hash.slice(1);
  const en = hash === 'en' || hash.startsWith('en-');
  const key = (en ? hash.slice(3) : hash) as PageKey;
  const path = PAGE_KEYS.includes(key) ? pages[key].path : '/';
  return en ? `/en${path === '/' ? '/' : path}` : path;
}

export const router =
  import.meta.env.MODE === 'artifact' ? createMemoryRouter(routes, { initialEntries: [previewEntry()] }) : createBrowserRouter(routes);
