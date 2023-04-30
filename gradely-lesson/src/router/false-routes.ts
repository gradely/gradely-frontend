import { RouteConfig } from 'vue-router';

const falseRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'FalseBase',
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */ '@/pages/false-pages/false-base.vue'
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/login',
    name: 'FalseLogin',
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */ '@/pages/false-pages/false-login.vue'
      ),
    meta: {
      guest: true,
    },
  },

  {
    path: '/test-components',
    name: 'FalseComponents',
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */ '@/pages/false-pages/false-components.vue'
      ),
    meta: {
      guest: true,
    },
  },

  {
    path: '/dev-login',
    name: 'DevLogin',
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        '@/pages/false-pages/dev-login.vue'
      ),
    meta: {
      title: 'Dev Login',
    },
  },

  {
    path: '/test-modals',
    name: 'TestModals',
    component: () =>
      import(
        /* webpackChunkName: "falseRoute" */
        '@/pages/false-pages/false-modals.vue'
      ),
    meta: {
      title: 'Test Modals',
    },
  },
];

export default falseRoutes;
